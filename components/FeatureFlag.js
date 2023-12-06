import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const FeatureFlagsContainer = styled.div`
  display: flex;
  width: 40%;
  border: 1px solid lightgray;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  border-radius: 3px;
`

const FeatureFlagToggle = styled.input`
  width: 18px;
  height: 18px;
  margin: 14px 15px 14px 0;
  ${props => !props.disabled && 'cursor: pointer;'}
`

const FeatureFlagName = styled.p`
  font-weight: ${props => (props.isLabel ? '600' : '400')};
  font-size: 16px;
  margin: 15px;
  color: ${COLOR.BODY_TEXT};
`

const FeatureFlagToggleContainer = styled.div`
  display: flex;
`

export default function FeatureFlag({ title, value, disabled, onChange }) {
  return (
    <FeatureFlagsContainer key={title}>
      <FeatureFlagName isLabel>{title}</FeatureFlagName>
      <FeatureFlagToggleContainer>
        <FeatureFlagName>{value ? 'Activated' : 'Deactivated'}</FeatureFlagName>
        <FeatureFlagToggle type="checkbox" onChange={onChange} disabled={disabled} checked={value} />
      </FeatureFlagToggleContainer>
    </FeatureFlagsContainer>
  )
}
