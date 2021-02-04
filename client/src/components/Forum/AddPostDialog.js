import React, { useState, useMemo } from 'react';
import {
    Grid,
    Button,
    InputLabel,
    TextField,
    Divider,
    Typography,
    Box,
    Tooltip,
    FormHelperText,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from './ForumModalStyles';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(2, 0),
    },
    input: {
        width: '100%',
        paddingBottom: theme.spacing(2),
    },
    label: {
        paddingBottom: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1, 0),
    },

    button: {
        width: '100%',
    },
    close: {
        height: 2.5,
    },
}));

const AddPostDialog = ({ handleCloseNewPost }) => {
    const classes = useStyles();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const onDrop = () => {
        console.log('Dropped');
    };

    const createPost = () => {};

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
        <div>
            <Grid item>
                <Button
                    onClick={handleCloseNewPost}
                    color="primary"
                    className={classes.close}
                >
                    <CloseIcon />
                </Button>
                <Typography
                    variant="h2"
                    id="modal-title"
                    align="center"
                    className={classes.title}
                >
                    Add Forum Post
                </Typography>
                <Typography variant="h4" id="modal-description" align="center">
                    Create a post for students in your course!
                </Typography>
                <Divider className={classes.divider} />
            </Grid>

            <Grid item container justify="center">
                <form>
                    <Grid item>
                        <InputLabel className={classes.label}>Post Title</InputLabel>
                        <TextField
                            variant="outlined"
                            defaultValue={title}
                            onChange={e => setTitle(e.target.value)}
                            className={classes.input}
                            placeholder="Add a title.."
                        />
                    </Grid>

                    <Grid item>
                        <InputLabel className={classes.label}>
                            Post Description
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            defaultValue={description}
                            onChange={e => setDescription(e.target.value)}
                            className={classes.input}
                            placeholder="Add a description.."
                        />
                    </Grid>
                    <Grid item>
                        <Box className={classes.imageContainer}>
                            <FormHelperText className={classes.label}>
                                Drag and drop post picture{' '}
                            </FormHelperText>
                            <Tooltip
                                title="Drag and drop post picture"
                                arrow
                                placement="right"
                            >
                                <Box {...getRootProps({ style })}>
                                    <img
                                        src="https://www.rcdrilling.com/wp-content/uploads/2013/12/default_image_01-1024x1024-570x321.png"
                                        className={classes.large}
                                        alt="Post"
                                    />
                                </Box>
                            </Tooltip>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            startIcon={<AddIcon />}
                            onSubmit={createPost}
                            className={classes.button}
                        >
                            Create Post
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    );
};

export default AddPostDialog;
