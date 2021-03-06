import React from 'react';
import { Box, Button, Container, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';

import { useConversationContext, useGlobalContext } from '../../context/studyappContext';

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: 120,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: theme.spacing(4),
        '& p': {
            fontSize: '1.375rem',
        },
    },
    textContainer: {
        width: '60%',
        maxHeight: 100,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.6rem',
            height: '12rem',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px grey',
            borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#ccc',
        },
    },
    buttonContainer: {
        width: '40%',
    },
    text: {
        height: 100,
        padding: 10,
    },
    iconAdornments: {
        fontSize: '1.5rem',
    },
    sendButton: {
        margin: theme.spacing(0, 3),
        width: 110,
    },
}));

const MessageCreator = ({ groupId }) => {
    const classes = useStyles();
    const { profile } = useGlobalContext();
    const { conversationManager } = useConversationContext();
    const [workingText, setWorkingText] = React.useState('');

    const sendMessage = () => {
        const payload = {
            profile: profile._id,
            text: workingText,
            image: profile.imageUrl,
        };
        conversationManager.sendMessageToGroup(groupId, payload);
        setWorkingText('');
    };

    const handleChangeText = ev => {
        setWorkingText(ev.target.value);
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.textContainer}>
                <TextField
                    fullWidth={true}
                    multiline={true}
                    value={workingText}
                    onChange={handleChangeText}
                    placeholder="Type your message here"
                    InputProps={{
                        classes: { input: classes.text },
                        disableUnderline: true,
                    }}
                    onKeyUp={e => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
            </Box>
            <Box
                display="flex"
                justifyContent="flex-end"
                className={classes.buttonContainer}
            >
                <IconButton>
                    <SentimentSatisfiedOutlinedIcon className={classes.iconAdornments} />
                </IconButton>
                <IconButton>
                    <InsertDriveFileOutlinedIcon className={classes.iconAdornments} />
                </IconButton>
                <Button
                    className={classes.sendButton}
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        sendMessage();
                    }}
                >
                    Send
                </Button>
            </Box>
        </Container>
    );
};

export default MessageCreator;
