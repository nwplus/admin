import React, { useState } from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants'
import Button from '../button'
import Modal from '../Assessment/Modal'
import { calculateNormalizedScores } from '../../utility/normalization'

const StyledButton = styled(Button)`
  background: ${COLOR.MIDNIGHT_PURPLE_LIGHT};
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const StyledModal = styled(Modal)`
  height: auto !important;
  border-radius: 10px;
`
const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const ModalButton = styled(Button)`
  margin: 10px;
  background: ${props => (props.variant === 'no' ? COLOR.RED : COLOR.GREEN)};
  color: white;
`

export default function CalcZScoreButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleYesClick = () => {
    // TODO: logic to calculate z-score goes in here?
    calculateNormalizedScores()
    setIsModalOpen(false)
  }

  const handleNoClick = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <StyledButton onClick={handleButtonClick}>Calculate z-score</StyledButton>
      {isModalOpen && (
        <StyledModal setShowing={setIsModalOpen}>
          <ModalContent>
            <p>
              🚨<strong>You are about to run a big script!</strong>
            </p>
            <p>
              Are you sure you want to calculate all z-scores? Please verify that{' '}
              <strong>all grading has been completed.</strong>
            </p>
            <ButtonContainer>
              <ModalButton variant="no" onClick={handleNoClick}>
                No
              </ModalButton>
              <ModalButton variant="yes" onClick={handleYesClick}>
                Yes
              </ModalButton>
            </ButtonContainer>
          </ModalContent>
        </StyledModal>
      )}
    </>
  )
}
