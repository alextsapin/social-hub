/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import { v1 } from 'uuid';

import { setCurrentPageAC, setSectionNumber } from '../../pages/Home/homeReducer';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import {
    calcTotalSectionSL,
    createPageArraySL,
    getСurrentPageSL,
} from '../../shared/selectors/home.selector';

import css from './css.module.scss';

export const Paginator = (): ReactElement => {
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector(getСurrentPageSL);
    const pageSize = useAppSelector(state => state.home.pageSize);
    const sectionSize = useAppSelector(state => state.home.sectionSize);
    const pages = useAppSelector(createPageArraySL);
    const sectionNumber = useAppSelector(state => state.home.sectionNumber);
    const sectionTotal = useAppSelector(calcTotalSectionSL);

    // Крайняя левая страница
    let leftPage = (sectionNumber - 1) * sectionSize + 1;
    // Крайняя правая страница
    let rightPage = sectionNumber * sectionSize;

    function changePage(pageNumber: number): void {
        // console.log(pageNumber);
        dispatch(setCurrentPageAC(pageNumber));
    }

    function prevSection(): void {
        dispatch(setSectionNumber(sectionNumber - 1));
    }

    function prevSection20(): void {
        dispatch(setSectionNumber(sectionNumber - 20));
    }

    function prevSection100(): void {
        dispatch(setSectionNumber(sectionNumber - 100));
    }

    /// //////////
    function nextSection(): void {
        dispatch(setSectionNumber(sectionNumber + 1));
    }

    function nextSection20(): void {
        dispatch(setSectionNumber(sectionNumber + 20));
    }

    function nextSection100(): void {
        dispatch(setSectionNumber(sectionNumber + 100));
    }

    return (
        <div className={css.wrap}>
            <div className={css.paginator}>
                {sectionNumber - 100 > 1 && (
                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        key={v1()}
                        onClick={() => {
                            prevSection100();
                            changePage(Number(leftPage) - 500);
                        }}
                    >
                        -500
                    </Button>
                )}

                {sectionNumber - 20 > 1 && (
                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        key={v1()}
                        onClick={() => {
                            prevSection20();
                            changePage(Number(leftPage) - 100);
                        }}
                    >
                        -100
                    </Button>
                )}

                {sectionNumber > 1 && (
                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        key={v1()}
                        onClick={() => {
                            prevSection();
                            changePage(Number(leftPage) - 1);
                        }}
                    >
                        -5
                    </Button>
                )}

                {pages
                    .filter(page => Number(page) >= leftPage && Number(page) <= rightPage)
                    .map(page => (
                        <Button
                            variant="contained"
                            size="small"
                            disabled={page === currentPage}
                            key={v1()}
                            onClick={() => changePage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                {sectionNumber < sectionTotal && (
                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        key={v1()}
                        onClick={() => {
                            nextSection();
                            changePage(Number(rightPage) + 1);
                        }}
                    >
                        +5
                    </Button>
                )}

                {sectionNumber + 20 < sectionTotal && (
                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        key={v1()}
                        onClick={() => {
                            nextSection20();
                            changePage(Number(rightPage) + 100);
                        }}
                    >
                        +100
                    </Button>
                )}

                {
                    // + 500
                    sectionNumber + 100 < sectionTotal && (
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            key={v1()}
                            onClick={() => {
                                nextSection100();
                                changePage(Number(rightPage) + 500);
                            }}
                        >
                            +500
                        </Button>
                    )
                }
            </div>
        </div>
    );
};
