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

use chrono::Utc;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
enum SignalEvent {
  AccountUpdatedSync,
}

impl SignalEvent {
  fn name(&self) -> &str {
    match self {
      SignalEvent::AccountUpdatedSync => "account_updated_sync",
    }
  }
}

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
pub struct SignalMessage {
  time_send: i64,
  time_publish: i64,
  message: String,
}

#[tauri::command]
pub async fn account_updated_sync(
  app_handle: AppHandle,
  message: String,
  time_send: i64,
) -> Result<(), String> {
  println!("Store updated sync: {:?} at {:?}", message, time_send);
  let time_publish = Utc::now().timestamp_millis();
  app_handle
    .emit(
      SignalEvent::AccountUpdatedSync.name(),
      SignalMessage {
        time_send,
        time_publish,
        message: message,
      },
    )
    .map_err(|e| e.to_string())?;

  Ok(())
}
