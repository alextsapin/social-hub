/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-magic-numbers */
import React, { ReactElement, useEffect } from 'react';

import Button from '@mui/material/Button';
import { v1 } from 'uuid';

import { setCurrentPageAC, setSectionNumber } from '../../pages/Home/home.reducer';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import {
    calcTotalSectionSL,
    createPageArraySL,
    getСurrentPageSL,
} from '../../shared/selectors/home.selector';

import css from './paginator.module.scss';

export const Paginator = (): ReactElement => {
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector(getСurrentPageSL);
    const sectionSize = useAppSelector(state => state.home.sectionSize);
    const pages = useAppSelector(createPageArraySL);
    const sectionNumber = useAppSelector(state => state.home.sectionNumber);
    const sectionTotal = useAppSelector(calcTotalSectionSL);

    // Крайняя левая страница
    const leftPage = (sectionNumber - 1) * sectionSize + 1;
    // Крайняя правая страница
    const rightPage = sectionNumber * sectionSize;

    function changePage(pageNumber: number): void {
        dispatch(setCurrentPageAC(pageNumber));
    }

    function changeSection(delta: number): void {
        dispatch(setSectionNumber(sectionNumber + delta));
    }

    useEffect(() => {
        dispatch(setSectionNumber(Math.ceil(currentPage / sectionSize)));
    }, [currentPage]);

    return (
        <div className={css.wrap}>
            <div className={css.paginator}>
                {
                    // В начало
                    sectionNumber > 1 && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            key={v1()}
                            onClick={() => {
                                changeSection(1);
                                changePage(1);
                            }}
                        >
                            1
                        </Button>
                    )
                }
                {
                    // - 500 страниц
                    sectionNumber - 100 > 1 && (
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            key={v1()}
                            onClick={() => {
                                changeSection(-100);
                                changePage(currentPage - 500);
                            }}
                        >
                            -500
                        </Button>
                    )
                }
                {
                    // - 100 страниц
                    sectionNumber - 20 > 1 && (
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            key={v1()}
                            onClick={() => {
                                changeSection(-20);
                                changePage(currentPage - 100);
                            }}
                        >
                            -100
                        </Button>
                    )
                }
                {
                    // - 5 страниц
                    sectionNumber > 1 && (
                        <Button
                            variant="contained"
                            size="small"
                            color="warning"
                            key={v1()}
                            onClick={() => {
                                changeSection(-1);
                                changePage(currentPage - 5);
                            }}
                        >
                            -5
                        </Button>
                    )
                }
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
                {
                    // + 5 страниц
                    sectionNumber < sectionTotal && (
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            key={v1()}
                            onClick={() => {
                                changeSection(1);
                                changePage(currentPage + 5);
                            }}
                        >
                            +5
                        </Button>
                    )
                }
                {
                    // + 100 страниц
                    sectionNumber + 20 < sectionTotal && (
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            key={v1()}
                            onClick={() => {
                                changeSection(20);
                                changePage(currentPage + 100);
                            }}
                        >
                            +100
                        </Button>
                    )
                }
                {
                    // + 500 страниц
                    sectionNumber + 100 < sectionTotal && (
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            key={v1()}
                            onClick={() => {
                                changeSection(100);
                                changePage(currentPage + 500);
                            }}
                        >
                            +500
                        </Button>
                    )
                }
                {
                    // В конец
                    sectionNumber !== sectionTotal && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            key={v1()}
                            onClick={() => {
                                changePage(pages[pages.length - 1]);
                            }}
                        >
                            {pages[pages.length - 1]}
                        </Button>
                    )
                }
            </div>
        </div>
    );
};
