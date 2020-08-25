import React from 'react';
import styled from 'styled-components';
import { COLOR, VIEW, NEW, CLOSE, SPONSORSHIP, FAQCategory, FAQ } from '../constants';
import TextBox from './textbox';
import Button from './button';
import Dropdown from './dropdown';

const BackDropScreen = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: ${COLOR.BLACK};
  opacity: 10%;
`;

export const ModalTitle = styled.h1`
  margin: 0;
  text-align: left;
  font-family: Apercu Pro;
  font-size: 24px;
  line-height: 30px;
  color: ${COLOR.BLACK};
`;

export const Label = styled.label`
  display: block;
  margin: 14px 0 11px 0;
  font-size: 16px;
  line-height: 20px;
`;

export const InputField = styled.input`
  ${(props) => (props.inline ? 'flex-grow: 1; width: 50%; border-radius: 2px 0 0 2px;' : 'width: 95%; border-radius: 2px;')}
  height: 40px;
  border: 1px solid ${COLOR.DARK_GRAY};
  box-sizing: border-box;
  margin-bottom: 0.75rem;
  padding: 0 0.75rem;
  background: ${COLOR.WHITE};
`;

const GenericText = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.BODY_TEXT};
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all !important;
  width: auto;
  text-align: left;
`;

export const ModalField = ({ label, value, type = 'text', onChange, modalAction }) => {
  return (
    <>
      <div>
        <Label>{label}</Label>
        {label === 'Answer' && modalAction !== VIEW && <TextBox width={'95%'} defaultValue={value} onChange={onChange} />}
        {label !== 'Answer' && label !== 'Category' && modalAction !== VIEW && <InputField type={type} defaultValue={value} onChange={onChange} />}
        {label === 'Category' && modalAction !== VIEW && (
          <Dropdown
            options={[
              {
                label: FAQCategory.GENERAL,
              },
              {
                label: FAQCategory.LOGS,
              },
              {
                label: FAQCategory.TEAMS,
              },
              {
                label: FAQCategory.MISC,
              },
            ]}
            onChange={onChange}
            defaultValue={value}
          />
        )}
        {modalAction === VIEW && <GenericText>{value}</GenericText>}
      </div>
    </>
  );
};

const UploadButton = styled(Button)`
  border-radius: !important;
  flex-grow: 1;
  width: 50%;
  padding: 24px 24px !important;
  padding: 0 0.75rem;
  margin-bottom: 0.75rem;
`;

const Inline = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: top;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 0.75rem;
  background: #c4c4c4;
`;

export const UploadContainer = ({ type, value, onClick }) => (
  <>
    <Inline>
      <InputField inline type={type} defaultValue={value} />
      <UploadButton onClick={onClick} inline>
        Upload Image
      </UploadButton>
    </Inline>
  </>
);

export const LogoImage = ({ children }) => (
  <>
    <div>
      <Label>Logo Image File</Label>
      <ImageContainer>{children}</ImageContainer>
    </div>
  </>
);

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
  height: 480px;
  max-height: 100%;
`;

const ButtonContainer = styled.div`
  margin: 0;
  float: right;
  display: inline-block;
`;

const InlineButtonSpan = styled.div`
  margin-left: 28px;
  margin-top: 37px;
  float: right;
  display: inline;
`;

export const ModalButton = ({ type, handleClose, handleSave }) => {
  let buttonText;
  if (type !== CLOSE && type !== VIEW) {
    buttonText = type === NEW ? 'Add New' : 'Save';
  }
  return (
    <>
      <ButtonContainer>
        {type === CLOSE && <Button type={CLOSE} color={COLOR.TRANSPARENT} contentColor={COLOR.DARK_GRAY} onClick={handleClose} />}
        {type !== CLOSE && type !== VIEW && (
          <>
            <InlineButtonSpan>
              <Button onClick={handleSave}>{buttonText}</Button>
            </InlineButtonSpan>
            <InlineButtonSpan>
              <Button onClick={handleClose} color="linear-gradient(180deg, #FF4E4E 0%, #FFEBEB 289.71%)" contentColor={COLOR.WHITE}>
                Cancel
              </Button>
            </InlineButtonSpan>
          </>
        )}
      </ButtonContainer>
    </>
  );
};

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-gap: 0.8rem;
  width: 100%;
  background-color: ${COLOR.BACKGROUND};
  text-align: left;
`;

export const ModalContent = ({ page, columns = 2, children }) => {
  if (page === SPONSORSHIP) {
    return (
      <>
        <ContentContainer columns="40% 60%">{children}</ContentContainer>
      </>
    );
  }
  return (
    <>
      <ContentContainer columns={columns === 2 ? '60% 40%' : '100%'}>{children}</ContentContainer>
    </>
  );
};

export default function Modal({ isOpen, handleClose, handleSave, modalAction, lastModified, children }) {
  if (!isOpen) {
    return null;
  }

  const getTitle = (action) => {
    switch (action) {
      case VIEW:
        return (
          <>
            <ModalTitle>View Details</ModalTitle>
            <GenericText>Last Modified {lastModified}</GenericText>
          </>
        );
      case NEW:
        return (
          <>
            <ModalTitle>New Item</ModalTitle>
          </>
        );
      default:
        return (
          <>
            <ModalTitle>Edit Item</ModalTitle>
          </>
        );
    }
  };

  return (
    <>
      {isOpen && <BackDropScreen />}
      <ModalBackground isOpen={isOpen}>
        <ModalButton type={CLOSE} handleClose={handleClose} />
        {getTitle(modalAction)}
        {children}
        <ModalButton type={modalAction} handleClose={handleClose} handleSave={handleSave} />
      </ModalBackground>
    </>
  );
}
