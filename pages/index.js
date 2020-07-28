import Head from "next/head"
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer
} from "../components/card"
import { EDIT, NEW } from "../constants"
import Button from "../components/button"
import Modal, { ModalTitle } from "../components/modal"

export default function Home() {
  return (
    <React.Fragment>
      <div>Login Page</div>

      <Card>
        <CardHeader>
          <CardTitle>Hi</CardTitle>
          <p>Some extra text</p>
          <CardButtonContainer>
            <Button type={EDIT}>Hi there</Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent>Example usage of card component</CardContent>
      </Card>

      <Modal>
        <ModalTitle>hello</ModalTitle>
      </Modal>
    </React.Fragment>
  )
}
