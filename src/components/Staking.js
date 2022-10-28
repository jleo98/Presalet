import { useState, useEffect } from 'react';

import {
    Box,
    Layer,
    Image,
    Text,
    TextInput,
    Button
} from 'grommet';
import { ethers } from "ethers";


export default function Staking(props) {


    const [totalStake, setTotalStake] = useState();
    const [totalDays, setTotalDays] = useState();





    return (
        <Box align="center" pad="medium">
            <Box width="small">
                Amount to stake
                <TextInput onChange={(e) => { setTotalStake(e.target.value) }} />

                Amount of days of staking
                <TextInput onChange={(e) => { setTotalDays(e.target.value) }} />
            </Box>

            <Button primary onClick={async () => {

                if (totalDays >= 30 && totalStake > 0) {
                    try {
                        await props.stakeTokens(totalStake, totalDays);
                    } catch (err) {
                        // console.log(err)
                        // setMsg(err.reason)
                    }
                }
                else {
                    console.log("wrong parameters");
                }
                setTimeout(() => {
                    // setMsg()
                }, 3000)
            }} label="Stake" />
        </Box>

    )
}
