import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createClient } from 'contentful';
import styled from 'styled-components';
import axios from 'axios';
import { componentMapper } from './componentMapper';
const queryOne = `
  query {
    demoPageCollection(where: { slug: "new-page"}, limit: 1) {
    items {
      title
      sectionsCollection(limit: 3) {
        items {
          ... on FiftyFifty {
            title
            heading
            subText
            image {
              url
            }
          }
          ... on CardSection {
            title
            heading
            cardGroupCollection(limit:3) {
              items {
                ... on Card {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const queryTwo = `
query demoPageEntryQuery {
  demoPage(id: "Yapr7AwU1W30EMJdOdlKK") {
    sys {
      id
    }
    # add the fields you want to query
    title
    sectionsCollection(limit: 10) {
      items {
        __typename
        ... on FiftyFifty {
          title
          heading
          subText
          image {
            url
          }
        }
        ... on CardSection {
          title
          heading
          cardGroupCollection(limit: 3) {
            items {
              title
              heading
              description
            }
          }
        }
      }
    }
  }
}
`;

// const client = createClient({
//   space: '7nuykul75i3k',
//   accessToken:
//     '0a531c422fe17337c470f11a7d20af635dc81ce638456081ea4f6d70e23025ba',
// });

// graphql.contentful.com/content/v1/spaces/7nuykul75i3k

// space id: 7nuykul75i3k
// access token

//graphql.contentful.com/content/v1/spaces/7nuykul75i3k/explore?access_token=0a531c422fe17337c470f11a7d20af635dc81ce638456081ea4f6d70e23025ba

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // client.getEntries().then(function (entries) {
    //   // log the title for all the entries that have it
    //   const page = entries.items.find(
    //     (entry) => entry.fields.slug === 'new-page'
    //   );

    //   setData(page);
    // });

    axios({
      method: 'POST',
      url: `https://graphql.contentful.com/content/v1/spaces/7nuykul75i3k`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 0a531c422fe17337c470f11a7d20af635dc81ce638456081ea4f6d70e23025ba`,
      },
      data: {
        query: queryTwo,
      },
    })
      .then((res) => {
        setData(res.data.data.demoPage);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (!data) return null;

  const {
    sectionsCollection: { items },
    title,
  } = data;

  return (
    <div className='App'>
      <h2>{title}</h2>
      {items.map((sectionProps) => {
        const Template = componentMapper(sectionProps.__typename);
        return <Template {...sectionProps} />;
      })}
    </div>
  );
}

export default App;
