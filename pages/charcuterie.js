import React from 'react';
import styled from 'styled-components';
import Button from '../components/button';
import { COLOR, BUTTON_COLOR } from '../constants';

const Container = styled.div`
    background-color: ${COLOR.MIDNIGHT_PURPLE};
`;

const Section = styled.div`
    margin: 40px;
`;

const Row = styled.div`
    display: flex;
    margin: 10px;
`;

const ButtonContainer = styled.div`
    margin: 10px;
`;

const BUTTON_TEXT = "Button"

export default function Charcuterie() {
    return (
        <Container>
            <Section>
                <Row>
                    <ButtonContainer>
                        <Button color={BUTTON_COLOR.PRIMARY} contentColor={COLOR.MIDNIGHT_PURPLE} >
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button color={BUTTON_COLOR.PRIMARY} contentColor={COLOR.MIDNIGHT_PURPLE} hoverContentColor={COLOR.TEAL} hoverBackgroundColor={BUTTON_COLOR.HOVER_PRIMARY} >
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button disabled >
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                </Row>

                <Row>
                    <ButtonContainer>
                        <Button color={BUTTON_COLOR.SECONDARY} contentColor={COLOR.MIDNIGHT_PURPLE} >
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button color={BUTTON_COLOR.SECONDARY} contentColor={COLOR.MIDNIGHT_PURPLE} hoverBackgroundColor={COLOR.LIGHT_GRAY}>
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button disabled >
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                </Row>

                <Row>
                    <ButtonContainer>
                        <Button color={COLOR.TRANSPARENT} contentColor={COLOR.NW_TEAL} hoverContentColor={COLOR.TEAL} outlined>
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button color={COLOR.TRANSPARENT} contentColor={COLOR.NW_TEAL} hoverContentColor={COLOR.TEAL} hoverBackgroundColor={BUTTON_COLOR.HOVER_PRIMARY} outlined>
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
                        <Button color={BUTTON_COLOR.DESTRUCTIVE} contentColor={COLOR.WHITE} hoverBackgroundColor={COLOR.BRIGHT_RED} >
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button disabled>
                            {BUTTON_TEXT}
                        </Button>
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
                        <Button color={BUTTON_COLOR.PRIMARY} contentColor={COLOR.MIDNIGHT_PURPLE} hoverContentColor={COLOR.TEAL} hoverBackgroundColor={BUTTON_COLOR.HOVER_PRIMARY} rounded>
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
                        <Button color={BUTTON_COLOR.SECONDARY} contentColor={COLOR.MIDNIGHT_PURPLE} hoverBackgroundColor={COLOR.LIGHT_GRAY} rounded>
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
                        <Button color={COLOR.TRANSPARENT} contentColor={COLOR.NW_TEAL} hoverContentColor={COLOR.TEAL} outlined rounded>
                            {BUTTON_TEXT}
                        </Button>
                    </ButtonContainer>

                    <ButtonContainer>
                        <Button color={COLOR.TRANSPARENT} contentColor={COLOR.NW_TEAL} hoverContentColor={COLOR.TEAL} hoverBackgroundColor={BUTTON_COLOR.HOVER_PRIMARY} outlined rounded>
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
                        <Button color={BUTTON_COLOR.DESTRUCTIVE} contentColor={COLOR.WHITE} hoverBackgroundColor={COLOR.BRIGHT_RED} rounded>
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
        </Container>
    )
}