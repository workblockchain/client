import fs from "fs/promises"
import minimist from "minimist"
import path from "path"

const args = minimist(process.argv.slice(2))
const langArg = args.l || args.lang
const rootDir = path.join(process.cwd(), "src")
const defaultLangs = ["en", "zh"]

interface I18nData {
  [key: string]: string
}

async function main() {
  // 1. 解析语言参数
  const targetLangs = langArg ? [langArg] : defaultLangs
  const langFiles = targetLangs.map((lang) => `i18n/${lang}.json`)

  // 2. 检查语言文件是否存在
  for (const file of langFiles) {
    try {
      await fs.access(path.join(rootDir, file))
    } catch {
      console.error(`语言文件 ${file} 不存在，请手动创建`)
      process.exit(1)
    }
  }

  // 3. 扫描所有tsx文件
  const tsxFiles = await getFiles(path.join(rootDir, "components"), ".tsx")
  const keys = new Set<string>()

  // 4. 提取i18n键
  const tFuncPatterns = [
    /\bt`((?:[^`]|\\.)*)`/g, // 匹配t`...`
    /\bt\(['"]([^'"]*)['"](?:,\s*\{[^}]*\})?\)/g, // 匹配t('...')或t("...", {...})
  ]

  for (const file of tsxFiles) {
    const content = await fs.readFile(file, "utf-8")
    for (const pattern of tFuncPatterns) {
      let match
      while ((match = pattern.exec(content)) !== null) {
        keys.add(match[1].trim())
      }
    }
  }

  // 5. 更新语言文件
  const addedKeys = new Set<string>()
  for (const langFile of langFiles) {
    const fullPath = path.join(rootDir, langFile)
    const data: I18nData = JSON.parse(await fs.readFile(fullPath, "utf-8"))
    const existingKeys = new Set(Object.keys(data))
    const langAddedKeys = new Set<string>()

    for (const key of keys) {
      if (!existingKeys.has(key)) {
        data[key] = key // 设置默认值与key相同
        existingKeys.add(key)
        langAddedKeys.add(key)
        addedKeys.add(key)
      }
    }

    if (langAddedKeys.size > 0) {
      await fs.writeFile(fullPath, JSON.stringify(data, null, 2) + "\n")
      console.log(
        `[${path.basename(langFile)}] 新增 ${langAddedKeys.size} 个键`
      )
    }
  }

  // 6. 输出统计
  console.log(`
统计结果：
- 共扫描文件：${tsxFiles.length} 个
- 发现i18n键：${keys.size} 个
- 新增键总数：${addedKeys.size} 个
- 已检查语言文件：${langFiles.join(", ")}
  `)

  // 提示需要手动处理的新增键
  if (addedKeys.size > 0) {
    console.log("\n请手动更新以下键的翻译值：")
    addedKeys.forEach((key) => console.log(`- ${key}`))
  }
}

async function getFiles(dir: string, ext: string): Promise<string[]> {
  const entries = await fs.readdir(dir, {withFileTypes: true})
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath, ext)))
    } else if (entry.isFile() && fullPath.endsWith(ext)) {
      files.push(fullPath)
    }
  }
  return files
}

main().catch((err: Error) => {
  console.error("执行出错:", err)
  process.exit(1)
})
