import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Avatar, Tooltip, Box } from '@material-ui/core';
import {
    baseStyle,
    activeStyle,
    acceptStyle,
    rejectStyle,
    useStyles,
} from './DragzonePicture.styles';
import { useGlobalContext } from '../context/studyappContext';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const ProfilePic = () => {
    const classes = useStyles();
    const [uploading, setUploading] = useState(false);
    const { profile, dispatch } = useGlobalContext();

    const onDrop = useCallback(
        async droppedFiles => {
            if (droppedFiles.length) {
                setUploading(true);

                const form = new FormData();
                form.append('image', droppedFiles[0]);
                const res = await axios
                    .post('/upload', form)
                    .catch(err => console.log(err));

                if (res && res.data) {
                    dispatch({ type: 'updateProfile', payload: res.data });
                }
            }
        },
        [dispatch]
    );

    useEffect(() => {
        setUploading(false);
    }, [profile]);

    const { getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: 'image/*',
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    return (
        <Box className={classes.container}>
            <Tooltip title="Drag and drop profile picture" arrow placement="right">
                <Box {...getRootProps({ style })}>
                    {profile.imageUrl ? (
                        <Avatar
                            alt="Profile Pic"
                            src={profile.imageUrl}
                            className={uploading ? classes.uploading : classes.large}
                        />
                    ) : (
                        <Avatar className={classes.large}>
                            <PersonAddIcon className={classes.large} />
                        </Avatar>
                    )}
                </Box>
            </Tooltip>
        </Box>
    );
};

export default ProfilePic;
