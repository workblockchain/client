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

mod signal;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        // app.handle().plugin(
        //   tauri_plugin_log::Builder::default()
        //     .level(log::LevelFilter::Info)
        //     .build(),
        // )?;

        let devtools = tauri_plugin_devtools::init();
        app.handle().plugin(devtools)?;
      }

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![signal::account_updated_sync])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
