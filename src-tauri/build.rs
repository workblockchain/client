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

use std::{
  env::var,
  fs::{read_dir, read_to_string},
  path::{Path, PathBuf},
};

use license::{LicenseNotationGenerator, LicenseNotationOptions};

fn main() {
  let root = PathBuf::from(var("CARGO_MANIFEST_DIR").unwrap());
  update_license(&root, &root.join("..").join(".license.txt")).unwrap();
  tauri_build::build();
}

fn update_license(root: &Path, license_template: &Path) -> std::io::Result<()> {
  let generator = LicenseNotationGenerator {
    template: &read_to_string(license_template)?,
    separator: "=== Auto generated, DO NOT EDIT ABOVE ===",
    options: LicenseNotationOptions::rust(),
  };
  generator.update_dir(read_dir(&root.join("src"))?);
  generator.update_file(&root.join("build.rs"))
}

mod license {
  use std::{
    fs::{read_dir, read_to_string, write, ReadDir},
    path::Path,
  };

  pub struct LicenseNotationGenerator<'a> {
    pub template: &'a str,
    pub separator: &'a str,
    pub options: LicenseNotationOptions<'a>,
  }

  impl<'a> LicenseNotationGenerator<'a> {
    pub fn update_dir(&self, root: ReadDir) {
      root
        .filter_map(|entry| entry.ok())
        .map(|entry| entry.path())
        .for_each(|path| {
          if path.is_dir() {
            self.update_dir(read_dir(path).unwrap());
          } else if self.options.match_extension(&path) {
            self.update_file(&path).ok();
          };
        });
    }

    pub fn update_file(&self, path: &Path) -> std::io::Result<()> {
      let content = read_to_string(path)?;
      let result = self.update(&content);
      write(path, result)
    }

    pub fn update(&self, raw: &str) -> String {
      let separator = format!(
        "{}{}{}",
        self.options.eol,
        self.options.add_comment(self.separator),
        self.options.eol,
      );
      format!(
        "{}{}{}{}{}",
        self.options.add_comment(self.template),
        self.options.eol,
        self.options.add_comment(self.separator),
        self.options.eol,
        match raw.split_once(&separator) {
          Some((_before, after)) => after.into(),
          None => format!("{}{}", self.options.eol, raw),
        }
      )
    }
  }

  pub struct LicenseNotationOptions<'a> {
    pub eol: &'a str,
    pub comment_prefix: &'a str,
    pub space_before_comment: bool,
    pub file_extension: &'a str,
  }

  impl<'a> LicenseNotationOptions<'a> {
    pub fn rust() -> LicenseNotationOptions<'static> {
      LicenseNotationOptions {
        eol: "\n",
        comment_prefix: "//",
        space_before_comment: true,
        file_extension: "rs",
      }
    }

    pub fn add_comment(&self, raw: &str) -> String {
      raw
        .split(self.eol)
        .map(|line| self.add_comment_line(line))
        .collect::<Vec<String>>()
        .join(self.eol)
    }

    pub fn add_comment_line(&self, raw: &str) -> String {
      match raw.is_empty() {
        true => self.comment_prefix.into(),
        false => match self.space_before_comment {
          true => format!("{} {}", self.comment_prefix, raw),
          false => format!("{}{}", self.comment_prefix, raw),
        },
      }
    }

    /// The given path is an existing file and matches the extension.
    pub fn match_extension(&self, path: &Path) -> bool {
      if !path.is_file() {
        return false;
      }
      path
        .extension()
        .and_then(|ext| ext.to_str())
        .map_or(false, |ext| ext == self.file_extension)
    }
  }
}
