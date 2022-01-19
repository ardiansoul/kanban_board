import React from 'react';
import { onChangeValidUrl } from './components/Board/Card';
import { progress } from './components/ProgressBar';

test('renders change validate url', () => {
    let string = "www.ardian.my.id";

    expect(onChangeValidUrl(string)).toBe("http://www.ardian.my.id")
});

test('renders progress function', () => {
    let current = 4;
    let total = 8;

    expect(progress(current, total)).toBe("50%")
});
