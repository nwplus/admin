import React, { useState } from 'react';
import styled from 'styled-components';
import EditIcon from './icons/edit'
import CloseIcon from './icons/close'
import { COLOR, NEW, EDIT, VIEW } from '../constants';
import Modal, { Label, ModalContent, ModalField } from '../components/modal'

const Container = styled.div`
  margin-bottom: 40px;
`;

const KeyValueContainer = styled.div`
  padding: 5px 0px 5px 5px;
  cursor: pointer;
  display: flex;
  &:hover {
      background-color: ${COLOR.WHITE};
  }
`

const GeneralKey = styled.span`
  color: ${COLOR.DARK_GRAY};
  font-size: 18px;
  padding-right: 5px;
`;

const FieldValue = styled.span`
  font-size: 18px;
`;

const FieldType = styled.span`
  color: ${COLOR.DARK_GRAY};
  font-size: 18px;
  display: none;
  ${KeyValueContainer}:hover & {
    display: block;
  }
`

const HoverContainer = styled.div`
  margin-left: auto;
  display: flex;
`

const IconContainer = styled.div`
  padding: 0px 5px 0px 5px;
`

const AddField = styled.p`
  padding: 5px 0px 5px 5px;
  cursor: pointer;
  color: ${COLOR.BLUE};
  font-size: 18px;
  &:hover {
    background-color: ${COLOR.WHITE};
  }
`

const TypeSelect = styled.select`
  color: ${COLOR.BODY_TEXT};
  width: 100%;
  text-align: left;
`

export default (props) => {
    const id = "nwHacks2021"
    const { title, content } = props
    const [config, setConfig] = useState(content)
    const [field, setField] = useState({})
    const [isAdding, setIsAdding] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalAction, setModalAction] = useState({})

    const handleAddField = async () => {
        console.log("du hello")
        setField({
            field: '',
            type: 'string',
            value: ''
        })
        setIsModalOpen(true)
        setIsAdding(true)
        setModalAction(NEW)
    }

    const handleEditField = async (fieldName) => {
        setField({
            field: fieldName,
            type: typeof configs[fieldName],
            value: configs[fieldName]
        })
        setIsModalOpen(true)
        setIsAdding(false)
        setModalAction(EDIT)
    }

    const handleClose = async () => {
        setField({})
        setIsModalOpen(false)
    }

    const handleChange = async (property, value) => {
        setField({
            ...field,
            [property]: value
        })
    }

    const handleSave = async (event) => {
        event.preventDefault()
        setIsModalOpen(false)

        setConfig({
            ...config,
            [field.field]: field.value
        })
    }

    return (
        <>
            <AddField onClick={handleAddField}>+ Add field</AddField>
            {Object.keys(config).map((fieldName) => {
                const value = config[fieldName]
                const fieldType = typeof value
                return (
                    <KeyValueContainer key={fieldName}>
                        <GeneralKey>{fieldName}: </GeneralKey>
                        <FieldValue>{fieldType === "string" ? `"${value}"` : value}</FieldValue>
                        <HoverContainer>
                            <FieldType>({fieldType})</FieldType>
                            <IconContainer onClick={() => handleEditField(fieldName)}>
                                <EditIcon color={COLOR.BLACK}/>
                            </IconContainer>
                            <IconContainer>
                                <CloseIcon color={COLOR.BLACK} />
                            </IconContainer>
                        </HoverContainer>
                    </KeyValueContainer>
                )
            })}

            {/* Modal for adding new field */}
            <Modal
                isOpen={isModalOpen}
                handleSave={handleSave}
                handleClose={handleClose}
                modalAction={modalAction}>
                    <ModalContent columns={3}>
                        <ModalField
                            label='Field'
                            value={field.field}
                            modalAction={isAdding ? modalAction : VIEW}
                            onChange={(event) => handleChange('field', event.target.value)}/>
                        <div>
                            <Label>Type</Label>
                            <TypeSelect
                                value={field.type}
                                onChange={(event) => handleChange('type', event.target.value)}>
                                    <option value="string">string</option>
                                    <option value="number">number</option>
                                    <option value="boolean">boolean</option>
                            </TypeSelect>
                        </div>

                        {
                            field.type === "boolean" ? (
                                <div>
                                    <Label>Value</Label>
                                    <TypeSelect
                                        value={field.value}
                                        onChange={(event) => handleChange('value', event.target.value)}>
                                            <option>true</option>
                                            <option>false</option>
                                    </TypeSelect>
                                </div>
                            ) : (
                                <ModalField
                                    label='Value'
                                    value={field.value}
                                    modalAction={modalAction}
                                    onChange={(event) => handleChange('value', event.target.value)}/>
                            )
                        }
                    </ModalContent>
            </Modal>
        </>
    )
}