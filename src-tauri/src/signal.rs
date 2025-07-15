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
