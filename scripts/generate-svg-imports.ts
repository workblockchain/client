// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import {readFileSync, writeFileSync} from "fs"
import {globSync} from "glob"
import path from "path"

// 生成PascalCase变量名并处理特殊后缀
function formatVarName(filePath: string) {
  const baseName = path.basename(filePath, ".svg")
  let varName = baseName
    .split(/[-\s_]+/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("")

  // 特殊文件名处理
  if (["react", "pomodoro"].includes(baseName)) {
    varName += "Icon"
  }
  return varName
}

function updateStoryFile() {
  // 转换为正斜杠路径并添加glob配置
  const assetsPath = path
    .join(process.cwd(), "src/assets/*.svg")
    .replace(/\\/g, "/")
  const storyPath = path.join(
    process.cwd(),
    "src/components/Icons/svgIcons.tsx"
  )

  // 获取所有SVG文件
  const svgFiles: string[] = globSync(assetsPath, {windowsPathsNoEscape: true})
  console.log(assetsPath, svgFiles)
  const imports = svgFiles
    .map((filePath, i, arr) => {
      const fileName = path.basename(filePath)
      const varName = formatVarName(filePath)
      console.log(`>>> (${i}/${arr.length}) import ${varName}`)
      return `import ${varName} from "@/assets/${fileName}?react"`
    })
    .sort()

  // 读取故事文件内容
  const storyContent = readFileSync(storyPath, "utf-8")

  // 替换import部分
  // 生成svgIcons数组条目
  const svgIconsEntries = svgFiles
    .map((filePath) => {
      const varName = formatVarName(filePath)
      return `  { name: '${varName}', component: ${varName} },`
    })
    .join("\n")

  // 同时替换import部分和svgIcons数组
  console.log("Before replacement:", storyContent)
  const updatedContent = storyContent.replace(
    /(\/\/ === Auto generated, DO NOT EDIT ABOVE ===\n)[\s\S]*?export\s+const\s+svgIcons\s*=\s*\[[^\]]*\];?/s,
    `$1${imports.join("\n")}\n\nexport const svgIcons = [\n${svgIconsEntries}\n];`
  )
  console.log("After replacement:", updatedContent)

  writeFileSync(storyPath, updatedContent)
  console.log("SVG imports updated successfully!")
}

updateStoryFile()
