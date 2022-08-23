import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile : Profile;
}

export default observer(function Followbutton({profile} : Props) {
    const {profileStore, userStore} = useStore();
    const {updateFollowng, loading} = profileStore;

    if(userStore.user?.username === profile.username) return null;

    function handleFollow(e : SyntheticEvent, username: string) {
        e.preventDefault();
        profile.following ? updateFollowng(username, false) : updateFollowng(username, true);
    }

    return (
        <Reveal animated="move">
                        <Reveal.Content visible style = {{width : '100%'}}>
                            <Button 
                                fluid 
                                color="teal" 
                                content= {profile.following ? 'Following' : 'Not following'}
                            />
                        </Reveal.Content>
                        <Reveal.Content hidden style = {{width : '100%'}}>
                            <Button 
                                fluid 
                                basic
                                color={profile.following ? 'red' : 'green'} 
                                content= {profile.following ? 'Unfollow' : 'Follow'}
                                loading = {loading}
                                onClick = {(e) => handleFollow(e, profile.username)}
                            />
                        </Reveal.Content>
                    </Reveal>
    )
})