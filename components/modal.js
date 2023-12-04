import React from 'react'
import styled from 'styled-components'
import { CLOSE, COLOR, EDIT, NEW, SPONSORSHIP, VIEW } from '../constants'
import Button from './button'
import Dropdown from './dropdown'
import { InputField } from './input'
import TextBox from './textbox'

const BackDropScreen = styled.div`
  width: 100vw;
  height: ${() => `${document.body.scrollHeight}px;`};
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: ${COLOR.BLACK};
  opacity: 50%;
`

export const ModalTitle = styled.h1`
  margin: 0 0 16px 0;
  text-align: left;
  font-size: 24px;
  line-height: 30px;
  color: ${COLOR.BLACK};
`

export const Label = styled.label`
  display: block;
  margin: 14px 0 11px 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
`

const GenericText = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.BODY_TEXT};
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all !important;
  width: auto;
  text-align: left;
`

export const ModalField = ({ dropdown, dropdownOptions, label, value, type = 'text', onChange, modalAction }) => {
  return (
    <>
      <div>
        <Label>{label}</Label>
        {(label === 'Answer' || label === 'Description') && modalAction !== VIEW && (
          <TextBox width="95%" defaultValue={value} onChange={onChange} />
        )}
        {label !== 'Answer' && label !== 'Description' && !dropdown && modalAction !== VIEW && (
          <InputField type={type} defaultValue={value} onChange={onChange} />
        )}
        {dropdown && modalAction !== VIEW && (
          <Dropdown options={dropdownOptions} onChange={onChange} defaultValue={value} />
        )}
        {modalAction === VIEW && <GenericText>{value}</GenericText>}
      </div>
    </>
  )
}

const UploadButton = styled(Button)`
  border-radius: !important;
  flex-grow: 1;
  width: 50%;
  padding: 24px 24px !important;
  padding: 0 0.75rem;
  margin-bottom: 0.75rem;
`

const Inline = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: top;
`

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 0.75rem;
  background: #c4c4c4;
`

export const UploadContainer = ({ type, value, onClick, disabled }) => (
  <>
    <Inline>
      <InputField inline disabled={disabled} type={type} defaultValue={value} />
      <UploadButton disabled={disabled} onClick={onClick} inline>
        Upload Image
      </UploadButton>
    </Inline>
  </>
)

export const LogoImage = ({ children }) => (
  <>
    <div>
      <Label>Logo Image File</Label>
      <ImageContainer>{children}</ImageContainer>
    </div>
  </>
)

const ModalBackground = styled.div`
  transform: translateY(0);
  position: fixed;
  display: block;
  padding: 40px;
  z-index: 500;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-out;
  /* TODO: add media queries to make width responsive */
  width: 740px;
  max-width: 100%;
  max-height: 70%;
  overflow-y: auto;
`

const ButtonContainer = styled.div`
  margin: 0;
  padding-bottom: 20px;
  float: right;
  display: inline-block;
`

const InlineButtonSpan = styled.div`
  margin-left: 28px;
  margin-top: 37px;
  float: right;
  display: inline;
`

export const ModalButton = ({ type, handleClose, handleSave }) => {
  let buttonText
  switch (type) {
    case NEW:
      buttonText = 'Add New'
      break
    case EDIT:
      buttonText = 'Save'
      break
    default:
      buttonText = 'Confirm'
      break
  }

  return (
    <>
      <ButtonContainer>
        {type === CLOSE && (
          <Button type={CLOSE} color={COLOR.TRANSPARENT} contentColor={COLOR.DARK_GRAY} onClick={handleClose} />
        )}
        {type !== CLOSE && type !== VIEW && (
          <>
            <InlineButtonSpan>
              <Button onClick={handleSave}>{buttonText}</Button>
            </InlineButtonSpan>
            <InlineButtonSpan>
              <Button
                onClick={handleClose}
                color="linear-gradient(180deg, #FF4E4E 0%, #FFEBEB 289.71%)"
                contentColor={COLOR.WHITE}
              >
                Cancel
              </Button>
            </InlineButtonSpan>
          </>
        )}
      </ButtonContainer>
    </>
  )
}

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns};
  grid-gap: 0.8rem;
  width: 100%;
  background-color: ${COLOR.BACKGROUND};
  text-align: left;
`

export const ModalContent = ({ page, columns = 2, children }) => {
  if (page === SPONSORSHIP) {
    return (
      <>
        <ContentContainer columns="40% 60%">{children}</ContentContainer>
      </>
    )
  }
  let columnsStyle = ''
  for (let i = 0; i < columns; i += 1) {
    columnsStyle += ' auto'
  }
  return (
    <>
      <ContentContainer columns={columns === 2 ? '60% 40%' : columnsStyle}>{children}</ContentContainer>
    </>
  )
}

export default function Modal({ isOpen, handleClose, handleSave, modalAction, lastModified, children, modalTitle }) {
  if (!isOpen) {
    return null
  }

  const getTitle = title => {
    switch (title) {
      case VIEW:
        return (
          <>
            <ModalTitle>View Details</ModalTitle>
            <GenericText>Last Modified {lastModified}</GenericText>
          </>
        )
      case NEW:
        return (
          <>
            <ModalTitle>New Item</ModalTitle>
          </>
        )
      case EDIT:
        return (
          <>
            <ModalTitle>Edit Item</ModalTitle>
          </>
        )
      default:
        return (
          <>
            <ModalTitle>{title}</ModalTitle>
          </>
        )
    }
  }

  return (
    <>
      {isOpen && <BackDropScreen />}
      <ModalBackground isOpen={isOpen}>
        <ModalButton type={CLOSE} handleClose={handleClose} />
        {(modalTitle && getTitle(modalTitle)) || getTitle(modalAction)}
        {children}
        <ModalButton type={modalAction} handleClose={handleClose} handleSave={handleSave} />
      </ModalBackground>
    </>
  )
}
