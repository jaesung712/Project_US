import React, { useState, useEffect } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import '../../src/admin.css';

const MemberDetailForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .memberListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    hr{ margin: 3rem 0 5rem; }
    .memberFlexBox{ display: flex; align-items: center; justify-content: center; }
    .memberImgBox img{ width: 35rem; height: 35rem; border: 2px solid lightgray; border-radius: 50%; box-shadow: 3px 3px 3px 3px rgb(240,240,240);}
    .memberInfoText { font-size: 1.6rem; margin-left: 10rem; margin-top: 3rem; }
    .memberInfoText p { margin-top: 0; font-weight: bold; color: #555;}
    .memberInfoText p span { font-weight: normal; margin-left: 1.8rem; color: black; }
    .returnBtnBox{ text-align: center; }
    .returnBtn { cursor: pointer; text-align: center; font-size: 2.5rem; font-weight: bold; background-color: #14c1c7; border: 1px solid white; color: white; width: 16rem; height: 4rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); font-size: 1.3rem; margin: 7rem 0 2.5rem; }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;

const MemberDetailPage = () => {
    
    const id = useParams();

    const [detail, setDetail] = useState([])
    
    useEffect(async () => {
        const info = await axios.get("http://localhost:3001/admin/member/Mdetail?idx="+id.idx)
        setDetail(info.data[0])
    }, []);
    
    return (
        <Form>
            <Header/>
            <SideBar/>
            <MemberDetailForm>
            <div className="memberListBox">
                <p className="title">???????????? <i class="fas fa-chevron-right"></i> ???????????????</p>
                <hr/>
                <div className="memberFlexBox">
                    <div className="memberImgBox">
                        <img src={detail.img !== null? '/'+detail.img : '/img/admin/noneImg.png'}/>
                    </div>
                    <div className="memberInfoText">
                        <p>???????????? : {detail.idx}</p>
                        <p>?????????(?????????) : {detail.email}</p>
                        <p>???????????? : {detail.code}</p>
                        <p>???????????? : {detail.createdAt}</p>
                        <p>?????? ??? : {detail.friendCnt}</p>
                        <p>???????????? 1 : {detail.agreement1}</p>
                        <p>???????????? 2 : {detail.agreement2}</p>
                    </div>
                </div>
                <div className="returnBtnBox">
                    <Link to= "/admin/member"><button className="returnBtn">???????????? ????????????</button></Link>
                </div>
            </div>
            </MemberDetailForm>
        </Form>
    );
}

export default MemberDetailPage;