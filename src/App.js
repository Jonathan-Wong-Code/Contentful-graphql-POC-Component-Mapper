import React from 'react';
import './App.css';
// import { createClient } from 'contentful';
import axios from 'axios';
import { componentMapper } from './componentMapper';
// const queryOne = `
//   query {
//     demoPageCollection(where: { slug: "new-page"}, limit: 1) {
//     items {
//       title
//       sectionsCollection(limit: 3) {
//         items {
//           ... on FiftyFifty {
//             title
//             heading
//             subText
//             image {
//               url
//             }
//           }
//           ... on CardSection {
//             title
//             heading
//             cardGroupCollection(limit:3) {
//               items {
//                 ... on Card {
//                   title
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `;

const queryTwo = `
query demoPageEntryQuery {
  demoPage(id: "dA93EtlqWriAO637bU3DG") {
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
//     'APIKEY',
// });

// graphql.contentful.com/content/v1/spaces/7nuykul75i3k

// space id: 7nuykul75i3k
// access token

//graphql.contentful.com/content/v1/spaces/7nuykul75i3k/explore?access_token=APIKEY

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
      url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      data: {
        query: queryTwo,
      },
    })
      .then((res) => {
        console.log(res);
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
