import React, { Component } from "react"
import { gql, graphql, compose } from "react-apollo"
import Loader from "../Loader"
import EventCard from "./EventCard"

class EventDataSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      bottomDraw: false,
      eventData: {},
      clipboardValue: "",
      copied: false,
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  componentWillReceiveProps(nextProps) {
    //eventData
    this.setState({
      eventData: nextProps.eventData,
    })
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value, copied: false })
  }

  onCopy = () => {
    this.setState({
      copied: true,
    })
  }

  render() {
    console.log("EventDataSheet render")
    const {
      data: { loading, getSingleEvent, error },
      eventTitle,
    } = this.props

    if (error) {
      return (
        <Loader
          loadingText={`Error retrieving event ${error.message}`}
          size={40}
          fontSize={22}
        />
      )
    }

    if (loading) {
      return <Loader loadingText={eventTitle} size={40} fontSize={22} />
    }

    console.log("Sheet Props ", this.props)

    const EventData = getSingleEvent[0]

    return <EventCard eventObject={EventData} />
  }
}

const SingleEventQuery = gql`
  query getEventByIDQuery($eventID: ID!) {
    getSingleEvent(ID: $eventID) {
      ID
      Title
      Date
      Description
      Venue
      Start
      Finish
      Approved
      Free
      Website
      TicketUrl
      TicketPhone
      Restriction
      SpecEntry
      AccessType
      IsEventFindaEvent
      Thumbnail
      BestImage
      EventFindaUrl
      EventFindaImages {
        edges {
          node {
            URL
            Title
            transformation_id
          }
        }
      }
      LocationText
      Lat
      Lon
      SecondaryTag {
        ID
        Title
      }
    }
  }
`

/** 
query getEventByIDQuery($eventID: ID!) {
  getSingleEvent(ID: $eventID) {
    ID
    Title
    Date
    Description
    Venue
    Start
    Finish
    Approved
    Free
    Website
    TicketUrl
    TicketPhone
    Restriction
    SpecEntry
    AccessType
    IsEventFindaEvent
    Thumbnail
    BestImage
    EventFindaUrl
    Owner {
      ID
    }
    Image {
      Version
    }
    EventImages(limit: 2) {
          edges {
            node {
            	Version
            }
          }
        }
    EventFindaImages {
     edges {
       node {
         URL
         Title
         transformation_id
        }
      }
    }
    LocationText
    Lat
    Lon
    SecondaryTag {
      ID
      Title
    }
  }
}

*/

export default compose(graphql(SingleEventQuery))(EventDataSheet)
