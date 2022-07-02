import { Fade } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage } from "../../store/slices/errorSlice";
import { RootState } from "../../store/store";

export const ErrorAlert = (props: JSX.IntrinsicAttributes) => {
    const error = useSelector((state: RootState) => state.error.message);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!error) return;
        window.setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 3000);
      }, [error])

    return (
        <Fade in={typeof error === 'string'}>
            <Alert {...props} className="error-message" severity="error">{error}</Alert>
        </Fade>
    );

}