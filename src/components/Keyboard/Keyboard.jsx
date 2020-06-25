import React from 'react';
import styles from './Keyboard.css';

const Keyboard = () => (
  <section className={styles.keyboard}>
    <div className={styles.keys}>
      <div data-key="" className={styles.white} data-note="A"></div>
      <div data-key="" className={styles.black} data-note="A#"></div>
      <div data-key="" className={styles.white} data-note="B"></div>
      <div data-key="65" className={styles.white} data-note="C"></div>
      <div data-key="87" className={styles.black} data-note="C#"></div>
      <div data-key="83" className={styles.white} data-note="D"></div>
      <div data-key="69" className={styles.black} data-note="D#"></div>
      <div data-key="68" className={styles.white} data-note="E"></div>
      <div data-key="70" className={styles.white} data-note="F"></div>
      <div data-key="84" className={styles.black} data-note="F#"></div>
      <div data-key="71" className={styles.white} data-note="G"></div>
      <div data-key="89" className={styles.black} data-note="G#"></div>
      <div data-key="72" className={styles.white} data-note="A"></div>
      <div data-key="85" className={styles.black} data-note="A#"></div>
      <div data-key="74" className={styles.white} data-note="B"></div>
      <div data-key="75" className={styles.white} data-note="C"></div>
      <div data-key="79" className={styles.black} data-note="C#"></div>
      <div data-key="76" className={styles.white} data-note="D"></div>
      <div data-key="80" className={styles.black} data-note="D#"></div>
      <div data-key="186" className={styles.white} data-note="E"></div>
      <div data-key="222" className={styles.white} data-note="F"></div>
      <div data-key="221" className={styles.black} data-note="F#"></div>
      <div data-key="" className={styles.white} data-note="G"></div>
    </div>
  </section>
);

export default Keyboard;
