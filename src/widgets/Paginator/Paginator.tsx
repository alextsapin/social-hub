/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';
import { v1 } from 'uuid';

import { maxItems } from '../../shared/constants';
import { useAppSelector } from '../../shared/hooks';

import css from './css.module.scss';

type PaginatorPropsType = {
    pageChange: (pageNumber: number) => void;
};

export const Paginator = (props: PaginatorPropsType): ReactElement => {
    const currentPage = useAppSelector(state => state.users.currentPage);
    const pages = useAppSelector(state => state.users.pageArray);

    const pageJSX = pages
        .map(item => (
            <Button
                variant="contained"
                size="small"
                disabled={item === currentPage}
                key={v1()}
                onClick={() => props.pageChange(item)}
            >
                {item}
            </Button>
        ))
        .filter((item, index) => (index < maxItems ? item : ''));

    return <div className={css.wrap}>{pageJSX}</div>;
};
