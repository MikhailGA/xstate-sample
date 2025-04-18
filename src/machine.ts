import { createActorContext } from '@xstate/react';
import {  assign,  fromPromise, setup } from 'xstate';
import { createBrowserInspector } from '@statelyai/inspect';

const { inspect } = createBrowserInspector();


const fakeFetch = () => new Promise<{ data: string }>((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve({ data: 'Fetched data' });
    } else {
      reject(new Error('Fetch error'));
    }
  }, 1000)})

type Context = { data: string | null; error: Error | null };
export const fetchMachine = setup({
  types: {
    context: {} as Context,
    events: {} as { type: 'FETCH' } | { type: 'RESET' },
  },
  actors: {
    fetchData: fromPromise(fakeFetch),
  },
  actions: {
    setData: assign((_, params: { data: string })=> ({ data: params.data })),
    setError: assign((_, params: { error: Error })=> ({ error: params.error })),
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiACwAmAMw4AjPJkAOWRICcAdgBsyphM0AaEAE9EAWikBWTThlNNVm8o2amNgL4fjqTLkJcAIYQeIJQJBBCYPiCAG5cANbRvtgAIoFogcxsSCDcvPxCIuIIEqo4VlISMlLy6kw1MppGpog6OEzyVnoyEkpS2vISVl4+6Ng4AcGh4WAATnNcczgchBnISwC2OClY6ZnZIvl8AsK5JTW26jXamvXK6lLqWsZmCO2d3Q19N0MSoyBdjhYABXDAYOCwcjUeiHXLHQpnUAlbTPHC6GR1ZQyKxMR42V6IbRSBTqeRMKoyLTSKzqbQAoHzRZzEgAJQoAGVqHDODwTkVzoh5E8cGS6lJlDYtHpKoSEOZtNocMo3PJmn0qqjsV5vCBBFwIHARLsjnzEcVEMp5KLFI9JXdNDKpHLzNI5JoqVUsfUcRJ6bqgQRiKaCqcLaV5ErrtZ7pG1bptC6ZDIldV8bSmjYBgzxv4giEwiH+UixIhenIVUwHNorFS+g4XfJsXYpBSnJUHFaPTm-MCwRDYPB4Waw4KELiJKLlLpNF17NppBI5bJbKpmk2rNU-RiexMmUsi+ax711DhNAM-VKHtPE60ECvlVJ15Kt4rpzqPEA */
  id: 'fetch',
  initial: 'idle',
  context: {
    data: null,
    error: null,
  },
  states: {
    idle: {
      on: { FETCH: 'loading' }
    },
    loading: {
      entry: assign({ data: null, error: null }), // Сбрасываем состояние
      invoke: {
        id: 'fetchData', // Идентификатор актора
        src: 'fetchData', // Вызываем сервис (Promise/async)
        onDone: { target: 'success', actions: { type: 'setData', params: ({ event }) => event.output } },
        onError: { target: 'error', actions: { type: 'setError', params: ({ event }) => ({ error: event.error as Error }) } },
      } 
    },
    success: {
      on: { FETCH: 'loading' }
    },
    error: {
      on: { RESET: {  target: 'idle' } }
    }
  }
});

export const FetchMachineContext = createActorContext(fetchMachine, {
  inspect,
 });

// // , {
//   actions: {
//     setData: assign({ data: (_, event) => event.data }),
//     setError: assign({ error: (_, event) => event.error })
//   },
// // }