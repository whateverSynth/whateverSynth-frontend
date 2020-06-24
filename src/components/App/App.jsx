import React from 'react';
import Synth from '../Synth/Synth';
import { EffectsProvider } from '../../hooks/EffectsProvider';

export default function App() {
  return (
    <>
      <EffectsProvider>
        <Synth />
      </EffectsProvider>
    </>
  );
}
