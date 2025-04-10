import { FetchMachineContext } from './machine';

import './index.css'



function App() {
  const state = FetchMachineContext.useSelector(state => state);

  return (
    <div>
      {state.matches('idle') && <FetchBtn />}
      {state.matches('loading') && <p>Загрузка...</p>}
      {state.matches('success') && (
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
          <pre>{JSON.stringify(state.context.data, null, 2)}</pre>
          <FetchBtn />
        </div>
      )}
      {state.matches('error') && (
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
          <p>Ошибка: {state.context.error?.message}</p>
          <FetchBtn />
          <ResetBtn />
      </div>
      )}
    </div>
  )
}

const FetchBtn = () => {
  const actorRef = FetchMachineContext.useActorRef();
  const can = FetchMachineContext.useSelector(state => state.can.bind(state));
  return <button disabled={!can({ type: 'FETCH' })} onClick={() => actorRef.send({ type: 'FETCH' })}>Загрузить</button>;
}

const ResetBtn = () => {
  const actorRef = FetchMachineContext.useActorRef();
  return <button onClick={() => actorRef.send({ type: 'RESET' })}>Сбросить</button>;
}

export default App
