import React from 'react'
import styled from 'styled-components'
import HackerEntry from '../components/Evaluator/HackerEntry'
import ScoreInput from '../components/Evaluator/scoreInput'
import { Title1, Title2, Title3, Title4 } from '../components/Typography'
import Button from '../components/button'
import Tag from '../components/tag'
import { BUTTON_COLOR, COLOR, TAG_COLOR } from '../constants'

const Container = styled.div`
  background-color: ${COLOR.MIDNIGHT_PURPLE};
  padding-bottom: 30px;
`

const Section = styled.div`
  margin: 40px;
`

const Row = styled.div`
  display: flex;
  margin: 10px;
`

const ButtonContainer = styled.div`
  margin: 10px;
`

const BUTTON_TEXT = 'Button'

const TagContainer = styled.div`
  margin: 10px;
`

export default function Charcuterie() {
  return (
    <>
      <Container>
        <Section>
          <Row>
            <ButtonContainer>
              <Button color={BUTTON_COLOR.PRIMARY} contentColor={COLOR.MIDNIGHT_PURPLE}>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                color={BUTTON_COLOR.PRIMARY}
                contentColor={COLOR.MIDNIGHT_PURPLE}
                hoverContentColor={COLOR.TEAL}
                hoverBackgroundColor={BUTTON_COLOR.HOVER_PRIMARY}
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button disabled>{BUTTON_TEXT}</Button>
            </ButtonContainer>
          </Row>

          <Row>
            <ButtonContainer>
              <Button color={BUTTON_COLOR.SECONDARY} contentColor={COLOR.MIDNIGHT_PURPLE}>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                color={BUTTON_COLOR.SECONDARY}
                contentColor={COLOR.MIDNIGHT_PURPLE}
                hoverBackgroundColor={COLOR.LIGHT_GRAY}
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button disabled>{BUTTON_TEXT}</Button>
            </ButtonContainer>
          </Row>

          <Row>
            <ButtonContainer>
              <Button color={COLOR.TRANSPARENT} contentColor={COLOR.NW_TEAL} hoverContentColor={COLOR.TEAL} outlined>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                color={COLOR.TRANSPARENT}
                contentColor={COLOR.NW_TEAL}
                hoverContentColor={COLOR.TEAL}
                hoverBackgroundColor={BUTTON_COLOR.HOVER_PRIMARY}
                outlined
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button disabled outlined>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>
          </Row>

          <Row>
            <ButtonContainer>
              <Button color={BUTTON_COLOR.DESTRUCTIVE} contentColor={COLOR.WHITE}>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                color={BUTTON_COLOR.DESTRUCTIVE}
                contentColor={COLOR.WHITE}
                hoverBackgroundColor={COLOR.BRIGHT_RED}
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button disabled>{BUTTON_TEXT}</Button>
            </ButtonContainer>
          </Row>
        </Section>

        <Section>
          <Row>
            <ButtonContainer>
              <Button color={BUTTON_COLOR.PRIMARY} contentColor={COLOR.MIDNIGHT_PURPLE} rounded>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                color={BUTTON_COLOR.PRIMARY}
                contentColor={COLOR.MIDNIGHT_PURPLE}
                hoverContentColor={COLOR.TEAL}
                hoverBackgroundColor={BUTTON_COLOR.HOVER_PRIMARY}
                rounded
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button disabled rounded>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>
          </Row>

          <Row>
            <ButtonContainer>
              <Button color={BUTTON_COLOR.SECONDARY} contentColor={COLOR.MIDNIGHT_PURPLE} rounded>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                color={BUTTON_COLOR.SECONDARY}
                contentColor={COLOR.MIDNIGHT_PURPLE}
                hoverBackgroundColor={COLOR.LIGHT_GRAY}
                rounded
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button disabled rounded>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>
          </Row>

          <Row>
            <ButtonContainer>
              <Button
                color={COLOR.TRANSPARENT}
                contentColor={COLOR.NW_TEAL}
                hoverContentColor={COLOR.TEAL}
                outlined
                rounded
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                color={COLOR.TRANSPARENT}
                contentColor={COLOR.NW_TEAL}
                hoverContentColor={COLOR.TEAL}
                hoverBackgroundColor={BUTTON_COLOR.HOVER_PRIMARY}
                outlined
                rounded
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button disabled outlined rounded>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>
          </Row>

          <Row>
            <ButtonContainer>
              <Button color={BUTTON_COLOR.DESTRUCTIVE} contentColor={COLOR.WHITE} rounded>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                color={BUTTON_COLOR.DESTRUCTIVE}
                contentColor={COLOR.WHITE}
                hoverBackgroundColor={COLOR.BRIGHT_RED}
                rounded
              >
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button disabled rounded>
                {BUTTON_TEXT}
              </Button>
            </ButtonContainer>
          </Row>
        </Section>

        {/* Tag components */}
        <Section>
          <Row>
            <TagContainer>
              <Tag color={TAG_COLOR.TEAL} contentColor={COLOR.WHITE}>
                Hello World
              </Tag>
            </TagContainer>
            <TagContainer>
              <Tag type="DELETE" color={TAG_COLOR.RED} contentColor={COLOR.WHITE} onDelete={() => alert('delete')}>
                Delete World
              </Tag>
            </TagContainer>
          </Row>
        </Section>

        {/* Typography */}
        <Section>
          <Row>
            <Title1>Header1</Title1>
          </Row>
          <Row>
            <Title2>Header2</Title2>
          </Row>
          <Row>
            <Title3>Header3</Title3>
          </Row>
          <Row>
            <Title4>Header4</Title4>
          </Row>
        </Section>
      </Container>

      <Section>
        <Row>
          <ScoreInput
            label="Sample Label"
            score={3}
            comment="Sample comment"
            handleClick={() => {}}
            handleTextChange={() => {}}
            maxScore={{ value: 7, weight: 1 }}
          />
        </Row>
      </Section>

      <Section>
        <Row>
          <HackerEntry
            index={1}
            firstName="Teddy"
            lastName="Flood"
            id={51}
            score={{ totalScore: 18 }}
            hasCompleted
            selectedHackerID={51}
          />
        </Row>
        <Row>
          <HackerEntry index={2} firstName="Alice" lastName="Lovelace" id={52} selectedHackerID={51} />
        </Row>
      </Section>
    </>
  )
}
