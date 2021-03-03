import React from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';
import { Message } from '../interfaces/Message';

const collectionPath = 'messages';

const MessageCollection = () => (
  <FirestoreCollection
    path={collectionPath}
    orderBy={[{ field: 'timestamp', type: 'asc' }]}
  >
    {(collection) => {
      return (
        <>
          <table className='app-history-table'>
            <tbody>
              {collection.value &&
                collection.value.map((item: Message, index: number) => (
                  <tr key={collection.ids[index]}>
                    <td>
                      {item.timestamp &&
                        new Date(
                          item.timestamp.seconds * 1000,
                        ).toLocaleDateString()}
                    </td>
                    <td>{item.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {collection.isLoading && <div>Loading messages...</div>}
        </>
      );
    }}
  </FirestoreCollection>
);

export default MessageCollection;
