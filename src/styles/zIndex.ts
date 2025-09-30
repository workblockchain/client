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

/**
 * Centralized z-index management system
 *
 * Usage guidelines:
 * - Base layer: 1-99
 * - Content layer: 100-499
 * - Overlay layer: 500-899
 * - Modal/Dialog layer: 900-1099
 * - Toast/Notification layer: 1100-1299
 * - Tooltip/Popover layer: 1300-1499
 * - Highest priority: 1500+
 */

export const zIndex = {
  // Base layers
  tableHeader: 10,
  pomodoroBar: 1,

  // Content layers
  navigation: 100,

  // Overlay layers
  menu: 500,
  filterFlyout: 600,
  drawer: 700,

  // Modal/Dialog layers
  avatarEditor: 900,
  modal: 1000,

  // Select dropdown should be above filter flyout
  selectDropdown: 650,

  // Highest priority
  tooltip: 1500,
  toast: 1600,
} as const

export type ZIndex = keyof typeof zIndex
