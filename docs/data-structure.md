# 核心数据结构说明

本文档基于 `src/interfaces/records.ts` 整理，详细说明 WorkBlockChain 客户端的三个核心数据结构。

## 1. Record - 基础记录接口

**核心作用**：作为所有记录类型的基类，提供统一的数据存储和签名基础，仅作为中间类型使用。实际记录的为SignedRecord

**关键字段**：
- `id`：唯一标识符，目前为随机的uuid，将来可能要包含所使用的智能协议的hash
- `data`：记录内容，存储为JSON字符串，可包含 WorkRecord、RequirementRecord、ProjectRecord 等具体数据
- `createdBy`：创建人/组的ID
- `createdAt`：创建时间戳（毫秒）

**扩展接口**：
- `RuntimeRecord<T>`：泛型运行时记录，直接存储类型化数据，同时暂存未被签名的数据的信息。
  - 字段中的`id`应为临时的本地id，需要在打包时重新生成
- **`SignedRecord`：带签名的记录，继承Record并添加 `signature` 字段。为最终存储的记录**
  - `isSigned`：是否已签名

## 2. WorkData - 劳动记录数据结构

**核心作用**：记录原子级别的劳动工作，支持时间跟踪、成果关联和多维度分类

### 劳动记录所需要的信息

- **劳动产出/劳动成果**
- **劳动时长**
  - 单位0.5小时
  - 可以展开为填写具体的`startTime`和`endTime`，此时不需要填写具体时长
  - 在显示时，根据`startTime`、`endTime`、`duration`、`createdAt`四个字段，mapping为对应的时间展示
    - 如在展示duration场景中，没有duration仅有start+end, 则自动计算时长，并四舍五入至0.5小时；在展示start/end的场景如甘特图，没有start+end, 则根据duration+createAt来进行自动计算
- 备注（对该劳动记录本身的备注）
- 标签（可多选，不超过3个，AI生成、AI推荐）
- 劳动人（可多选），空白创建时为空
  - 关联需求时，当字段为空时，默认替换为需求负责人
  - 从需求入口创建时默认关联当前需求
  - 可替换/额外添加。**添加多个负责人时，同时创建多个劳动记录**
- 所属需求（除非未选定，否则直接关联当前客户端进行中需求/从入口所设置的默认值读取）

**关键字段**：

### 时间相关
- `wid`：可读的劳动ID
- `startTime`/`endTime`：开始和结束时间戳
- `duration`：持续时间（秒），支持手动补充

### 成果关联
- `outcome`：劳动成果（链接、文档、base64等）
- `usedOutcome`：使用的前置产出

### 分类与关联
- `userId`：劳动人ID
- `workTags`：多维度劳动标签
- `requirementIds`/`projectIds`：关联的需求和项目ID

### 描述信息
- `description`：自然语言描述
- `cover`：封面图片

## 3. RequirementData - 需求记录数据结构

**核心作用**：管理系统需求，支持优先级管理、状态跟踪和依赖关系

**关键字段**：

### 基本信息
- `rid`：可读的需求ID
- `title`/`description`：标题和描述

### 管理与分配
- `priority`：优先级
- `status`：状态（基于 `requirementStatusList`）
- `assignedTo`：当前被分配人ID
- `estimated`：预计时间（小时）

### 分类与关联
- `tags`：标签
- `requirementType`：需求类型
- `projectIds`：关联项目ID，可选项，可以在后续关联和改动
- `workRecordIds`：关联工作记录ID，**仅能在运行时去构建**

### 关系与进度
- `relationship`：依赖关系（父子、阻塞等）
- `relatedOutcomes`：关联成果ID
- `progress`：进度百分比（基于工作记录计算），**运行时数据**
- `contributors`：贡献者列表 **运行时数据**，基于outcomes映射

## 4. ProjectData - 项目记录数据结构

**核心作用**：管理项目信息，跟踪项目进度和关联关系

**关键字段**：
- `pid`：可读的项目ID
- `projectType`：项目类型
- `status`：状态
- `assignedTo`：被分配人ID
- `title`/`description`：标题和描述
- `progress`：进度百分比 **运行时数据**
- `contributors`：贡献者列表
- `requirementIds`：关联的需求ID
- `relationship`：项目间关系

## 数据关系图

```
Record (基础)
├── RuntimeRecord<T> (泛型运行时记录)
├── SignedRecord (签名记录)
└── data字段包含的具体数据类型
    ├── WorkData (劳动记录)
    ├── RequirementData (需求记录)
    └── ProjectData (项目记录)
```

**关联关系**：
- WorkData 通过 `requirementIds` 和 `projectIds` 关联到 RequirementData 和 ProjectData
- RequirementData 通过 `workRecordIds` 反向关联到 WorkData
- ProjectData 通过 `requirementIds` 关联到 RequirementData

## 状态枚举

- `requirementStatusList`: ["todo", "doing", "done"] - 需求状态列表

---

*最后更新：基于 `src/interfaces/records.ts` 生成*