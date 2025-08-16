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

import {useUserProfile} from "@/stores/useUserProfile"
import {useEffect, useMemo} from "react"
import {useForm} from "react-hook-form"
import styled from "styled-components"
import {TextInputWithLabel} from "../Input"
import {WorkRecord} from "./interfaces"

export function WorkRecordForm({submit}: {submit: (data: WorkRecord) => void}) {
  const {register, handleSubmit, reset} = useForm<WorkRecord>()
  const userId = useUserProfile((state) => state.uid)

  const defaultValues = useMemo<WorkRecord>(() => {
    const res: WorkRecord = {
      wid: "",
      outcome: "",
      duration: 0,
      userId,
    }
    return res
  }, [userId])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <TextInputWithLabel label={"劳动成果"} {...register("outcome")} />
      <TextInputWithLabel
        type="number"
        label={"时长"}
        {...register("duration")}
      />
    </Form>
  )
}

const Form = styled.form``
