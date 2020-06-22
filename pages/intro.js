import Card from '../components/card'

const props = {
    nwHacks: {
        subtitle: `Last modified [TIME STAMP FIREBASE] by [USER FROM FIREBASE]`,
        contentHeader: `This is nwHacks 2019`,
        content: `Come make things and break things, and then make them cooler. You'll never be short on inspiratoin when you're surrounded by 650 of the brightest minds in the Pacific Northwest. All you need to bring is an open mind and an insatiable desire to learn; we'll take care of the rest. After all, we're western Canada's largest hackathon - we make the west coast the best coast.`,
        otherSubtitle: `Last modified [TIME STAMP FIREBASE] by [USER FROM FIREBASE]`,
        otherContentHeader: `Why nwHacks?`,
        otherContent: `Vancouver is breathtaking and so are you`
    }
}

export default function IntroPage() {
    // TODO need functionality to display data based on what event is currently being viewed

    function Content(props) {
        const { header, content } = props
        return (
            <div>
                <h1>{header}</h1>
                <p>{content}</p>
            </div>
        )
    }


    return (
        <React.Fragment>
            <Card Header='Intro Text' Subtitle={props.nwHacks.subtitle} Content={<Content header={props.nwHacks.contentHeader} content={props.nwHacks.content} />} />
            <Card Header='Other Text Section(s)' Subtitle={props.nwHacks.otherSubtitle} Content={<Content header={props.nwHacks.otherContentHeader} content={props.nwHacks.otherContent} />} />
        </React.Fragment>
    )
}