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

import chalk from "chalk"
import {readdirSync, readFileSync, statSync, writeFileSync} from "node:fs"
import {join, normalize} from "node:path"
import {argv} from "node:process"

class LicenseNotationGenerator {
  constructor(options: {
    template: string
    separator: string
    options: FileCommentOptions
  }) {
    this.template = options.template
    this.separator = options.separator
    this.options = options.options
  }

  template: string
  separator: string
  options: FileCommentOptions

  reviewDir(root: string) {
    const extensions = this.options.fileExtensions
    readdirSync(root, {recursive: true})
      .map((path) => path.toString())
      .map((path) => join(root, path))
      .filter((path) => extensions.some((ext) => path.endsWith(ext)))
      .filter((path) => statSync(path).isFile())
      .forEach((path) => this.reviewFile(path))

    console.log(
      `${chalk.green("license notation unchanged in")}${chalk.dim(`: ${root}`)}`
    )
  }

  reviewFile(path: string) {
    const raw = readFileSync(path).toString()
    const updated = this.update(raw)
    if (raw !== updated) {
      console.warn(
        `${chalk.yellow("invalid license notation")}${chalk.dim(`: ${path}`)}`
      )
      throw new Error(`invalid license notation at ${path}`)
    }
  }

  updateDir(root: string) {
    const extensions = this.options.fileExtensions
    readdirSync(root, {recursive: true})
      .map((path) => path.toString())
      .map((path) => join(root, path))
      .filter((path) => extensions.some((ext) => path.endsWith(ext)))
      .filter((path) => statSync(path).isFile())
      .forEach((path) => this.updateFile(path))

    console.log(
      `${chalk.green("license notation updated")}${chalk.dim(`: ${root}`)}`
    )
  }

  updateFile(path: string) {
    const raw = readFileSync(path).toString()
    const updated = this.update(raw)
    if (raw !== updated) {
      writeFileSync(path, updated)
      console.log(`${chalk.blue("updated")}: ${path}`)
    } else {
      console.log(`${chalk.magenta("unchanged")}${chalk.dim(`: ${path}`)}`)
    }
  }

  update(raw: string): string {
    const eol = this.options.eol
    const sep = `${eol}${this.options.addComment(this.separator)}${eol}`
    const index = raw.indexOf(sep)
    const rest = index < 0 ? `${eol}${raw}` : raw.substring(index + sep.length)
    const prefix = [
      this.options.addComment(this.template),
      this.options.addComment(this.separator),
    ].join(eol)
    return `${prefix}${eol}${rest}`
  }
}

class FileCommentOptions {
  constructor(options: {
    eol: string
    commentPrefix: string
    spaceBeforeComment: boolean
    fileExtensions: string[]
  }) {
    this.eol = options.eol
    this.commentPrefix = options.commentPrefix
    this.spaceBeforeComment = options.spaceBeforeComment
    this.fileExtensions = options.fileExtensions
  }

  eol: string
  commentPrefix: string
  spaceBeforeComment: boolean
  fileExtensions: string[]

  addComment(raw: string): string {
    return raw
      .split(this.eol)
      .map((line) => this.addCommentLine(line))
      .join(this.eol)
  }

  addCommentLine(raw: string): string {
    if (raw.length === 0) return this.commentPrefix
    if (this.spaceBeforeComment) return `${this.commentPrefix} ${raw}`
    return `${this.commentPrefix}${raw}`
  }
}

function main() {
  const root = normalize(join(import.meta.dirname, ".."))
  const generator = new LicenseNotationGenerator({
    template: readFileSync(join(root, ".license.txt")).toString(),
    separator: "=== Auto generated, DO NOT EDIT ABOVE ===",
    options: new FileCommentOptions({
      eol: "\n",
      commentPrefix: "//",
      spaceBeforeComment: true,
      fileExtensions: [".ts", ".tsx"],
    }),
  })
  const codes = ["src", "scripts"].map((path) => join(root, path))
  argv.includes("-c")
    ? codes.forEach((code) => generator.reviewDir(code))
    : codes.forEach((code) => generator.updateDir(code))
}
main()
