import React, { useState, useEffect } from "react";
import Header from "../UserComponents/header";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MyPageQnAWrap = styled.div`
    * { text-decoration:none; }
    ul, li { list-style: none; padding:0; margin: 0;}
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .container { max-width:100rem; margin: 0 auto; }
    .navBar { float: left; width: 12rem; padding: 5rem 3rem 3rem 2rem; }
    .menuLink { margin-bottom: 4rem; color: #555; cursor: pointer; font-size: 1.6rem; }
    .menuLink.on { font-weight: 600; color: #14c1c7; }
    .menuLink:hover { color:#14c1c7; font-weight: 600; }
    .content { padding: 4rem 3rem 5rem 10rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1); height: 79.5vh; }
    .profileItem { position: relative; align-items: center; margin-bottom: 2rem; margin-left: 0.5rem; }
    .profileItem select, .profileItem option { margin-right: 1rem; font-size: 1.4rem; width: 18rem; height: 4rem; padding: 0.5rem; border-color: rgba(0,0,0,0.2); border-radius: 3px; }
    .profileItem select:focus { border-color: rgba(0,0,0,0.1); outline: none; }
    .profileItem div { display: inline-block; }
    .profileItem h1 { font-size: 1.75rem; margin-bottom: 1rem; color: #444; }
    .section1 { width: 11rem; font-size: 1.45rem; font-weight: 600; vertical-align: top; }
    .section2 { width: 80%; font-size: 1.3rem; }
    .profileImg { width: 8rem; }
    .profileImg img { width: 5rem; border-radius: 50%; vertical-align: middle; border: 2px solid #999; }
    .section2 input, .section2 textarea { border: 1px solid lightgray; background-color: #fff; border-radius: 3px; width: 90%; height: 4rem; font-size: 1.4rem; padding-left: 1rem; }
    .section2 textarea { height: 16rem; padding-top: 1rem; }
    .section2 p { font-size: 1.5rem;  margin: 0; position: relative; top:1.5rem; font-weight: bold; color: #555; }
    .profileSelect { margin-left: 1.5rem; }
    .profileSelect .decType { width: 100%; }
    .firstItem { margin-top: 4rem; }
    .profileFirst { margin-bottom: 3rem; }
    .proFirst { margin-bottom: 4rem; }
    .QnaTitle { margin-top: 0.5rem; color: #444; }
    .red { color: #14c1c7; font-size: 1.2rem; font-weight: bold; }
    #target { width: 81%; }
    .submitBtn { text-align: center; margin-top: 3rem; }
    .btn { width: 12rem; height: 4rem; font-size: 1.5rem; background: #14c1c7; border-radius: 7px; color: #fff; cursor: pointer; box-shadow: 3px 3px 3px #d0d0d0; }
    .popup { padding: 1.5rem 1rem 1rem; }
    .fa-search { font-size: 2.6rem; color: #14c1c7; cursor: pointer; }
    .fa-search:hover { font-size: 2.75rem; color: #14c1c7;  }
    // ????????? css
    .mw { position:fixed; top:0; left:0; width:100%; height:100%; z-index: 1000; }
    .mw .bg { position:fixed; top:0; left:0; width:100%; height:100%; background:#000; opacity:.5; filter:alpha(opacity=50); }
    .mw .fg { position:absolute; top:50%; left:50%; width: 45rem; height: 52rem;  transform: translate(-50%, -50%); background:#fff; border-radius: 30px; }
    .closeBtn { position: absolute; cursor: pointer; font-size: 4rem; top: 1.5rem; right: 3rem; }
    .mw .fg .modalTitle { border: none; width: 14rem; margin: 2rem auto; font-size: 2rem; font-weight: bold;  }
    .fa-times { font-size: 3.5rem; }
    .nonData { font-size: 1.6rem; color: #777; margin: 3rem auto; }
    .searchName input[type="text"] { width: 25rem; margin-left: 1.5rem; border: none; border-bottom: 2px solid #9b9b9b; height: 3rem; font-size: 1.4rem;  }
    .searchName input[type="button"] { width: 6rem; padding: 1rem; margin-left: 1rem; font-size: 1.4rem; font-weight: bold; color: #14c1c7; cursor: pointer; border: none; box-shadow: 1.5px 1.5px 1.5px 2px #e7e7e7; } 
    .searchName { margin-left: 4rem; margin-top: 3rem; font-size: 1.5rem; font-weight: bold; color: #444; }
    .findForm { border: 1px solid #c7c7c7; width: 38rem; height: 32rem; margin-left: 3.6rem; margin-top: 2rem; overflow-y: auto; }
    .findForm p {  border: 1px solid #c7c7c7; height: 3rem; width: 85%; margin: 0rem auto 0.5rem; border-radius: 5px; padding: 1.2rem 1.5rem 0.5rem; }
    .email { color: #14c1c7;  }
    .fa-angry { font-size: 3rem;}
`;

const MyPageQnA = () =>{
    // ???????????????
    const [name, setName] = useState('');
    const [proImg, setProImg] = React.useState('')

    // ?????? ??????
    let [type, setType] = useState([]);
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');

    // ?????? ?????????
    let [defendant, setDefendant] = useState(null);

    // ??????
    const [modalOn, setModalOn] = useState(false); 
    let [popup, setPopup] = useState();

    // ?????? ?????? ??????
    let [friendsList, setFriendsList] = useState([]);

    // ?????? ??????
    let [codeFriend, setCodeFriend] = useState(null);

    // memberIdx
    const param = window.location.search.split('=')[1];

    // ??????????????? ????????????
    useEffect(()=>{
        axios.get("http://localhost:3001/member/edit", {
            params: {
                'idx': param
            }
        })
        .then(function (result) {
            console.log(result.data[0]) 
            setName(result.data[0].name)
            setProImg(result.data[0].img)
        }).catch(function (error) {
        });
    },[])

    // ???????????? ????????????
    useEffect(async () => {
        const list = await axios.get(`http://localhost:3001/main/friend/list?idx=${param}`)
        setFriendsList(list.data)
        console.log(friendsList)
    }, [modalOn]);

    // ?????? ?????? ?????????
    const selectType = (e) => {
        e.preventDefault();
        setType(e.target.value);
    }
    // ?????? ?????????
    const changeTitle = (e)=>{
        e.preventDefault();
        setTitle(e.target.value);
    }
    // ?????? ?????????
    const changeContent = (e)=>{
        e.preventDefault();
        setContent(e.target.value);
    }

    // ??????????????? ?????????
    const addDefendant = (target)=>{
        console.log(target);
        setDefendant(target);
        document.querySelector('#target').value = target.email;
        setModalOn(!modalOn);
    }

    // ?????? ?????? ?????? ??????
    const codeBtn = async() =>{
        let code = document.getElementById('codeInput').value
        let findFriend = await axios.post("http://localhost:3001/main/friend?code=" + code + `&idx=${param}`);
        console.log(findFriend.data);
        setCodeFriend({info:findFriend.data.result1[0], flag:findFriend.data.flag});
    }

    // ???????????? axios ??????
    const goRegist = async () => {
        let korType = '';
        
        if(type==='declaration'){
            korType += '????????????';
        } else {
            korType += '????????????';
        }

        console.log(defendant);

        await axios({
            method: "post",
            url:`http://localhost:3001/inquiry`,
            data: {
                memberIdx: param,
                title: title,
                content: content,
                type: korType,
                respondent : defendant.idx
            }
        }).then(()=>{
            alert('?????????????????????.');
            window.location.reload();
        });
    }

    const onOpenModal = (e) => {
        setModalOn(!modalOn);
        //?????? ??? ?????? ??? body ?????????
        if(modalOn==false){
            document.body.style.overflow = "hidden";
        }else if(modalOn==true){
            document.body.style.overflow = "unset";
        }
    }
    
    // ???????????? ?????? ?????? html
    const Modal = () => {
        return(
            <div id="mw_temp" className="mw">
                <div className="bg"></div>
                <div className="fg">
                    <div className="closeBtn" onClick={onOpenModal}><i className="fas fa-times"></i></div>
                    <p className="modalTitle">???????????? ??????</p>
                    <div className="searchName"><i class="far fa-angry"></i><input type="text" placeholder="??????????????? ????????? ???????????????" id="codeInput"/><input type="button" value="??????" onClick={codeBtn}/></div>
                    <div className="findForm">
                        {codeFriend==null ?
                            friendsList.length!==0 ?
                                friendsList.map(list=>(
                                    <p onClick={()=>{addDefendant(list)}} style={{cursor:"pointer"}}>{list.name} [ <span className="email">{list.email}</span> ]</p>
                                ))
                                :
                                <p>????????? ????????? ???????????? ????????????.</p>
                            :
                            <p onClick={()=>{addDefendant(codeFriend.info)}} style={{cursor:"pointer"}}>{codeFriend.info.name} [ <span className="email">{codeFriend.info.email}</span> ]</p>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header idx={param} param={param}/>
            <MyPageQnAWrap>
                <div className="container">
                    <div>
                    <ul className="navBar">
                            <Link to={"/mypage?idx=" + param}><li className="menuLink ">????????? ??????</li></Link>
                            <Link to={"/mypagePw?idx=" + param}><li className="menuLink">???????????? ??????</li></Link>
                            <Link to={"/mypageLogin?idx=" + param}><li className="menuLink">????????? ??????</li></Link>
                            <Link to={"/mypageQnA?idx=" + param}><li className="menuLink on">????????????</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        { type !== "declaration" ? 
                            <ul className="profileList">
                                <li className="profileItem proFirst">
                                    <h1>??????/????????????</h1>
                                </li>
                                <li className="profileItem">
                                    <div className="profileImg section1">
                                        <img src={proImg===null||proImg==='' ? '/img/blank_profile.png' : proImg} alt="???????????????"/>
                                    </div>
                                    <div className="profileNameBox section2">
                                        <p className="profileName">{name}</p>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect firstItem">
                                    <div className="QnaTitle section1">????????????</div>
                                    <select name="category1" id="category1" onChange={selectType}>
                                        <option value="inquiry1">????????????</option>
                                        <option value="inquiry2">????????? ??????</option>
                                        <option value="inquiry3">????????? ??????</option>
                                        <option value="declaration">????????????</option>
                                    </select>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">?????????</div>
                                    <div className="titleBox section2">
                                        <input type="text" name="title" id="title" placeholder="??????" onBlur={changeTitle}/>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaContent section1">????????????</div>
                                    <div className="contentBox section2">
                                        <textarea type="text" name="content" id="content" placeholder="??????" onBlur={changeContent}/>
                                    </div>
                                </li>
                            </ul>
                            :
                            <ul className="profileList">
                                <li className="profileItem profileFirst">
                                    <h1>??????/????????????</h1>
                                    <span className="red">* ??????????????? ?????????????????? ??? ??? ????????????.</span>
                                </li>
                                <li className="profileItem">
                                    <div className="profileImg section1">
                                        <img src={proImg===null||proImg==='' ? '/img/blank_profile.png' : proImg} alt="???????????????"/>
                                    </div>
                                    <div className="profileNameBox section2">
                                        <p className="profileName">{name}</p>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect firstItem">
                                    <div className="QnaTitle section1">????????????</div>
                                    <select name="category1" id="category1" onChange={selectType}>
                                        <option value="inquiry1">????????????</option>
                                        <option value="inquiry2">????????? ??????</option>
                                        <option value="inquiry3">????????? ??????</option>
                                        <option value="declaration">????????????</option>
                                    </select>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">????????????</div>
                                    <div className="titleBox section2">
                                        <input type="text" id="target" placeholder="????????????" readOnly/><span className="popup" onClick={onOpenModal}><i class="fas fa-search"></i></span>
                                        {modalOn? <Modal/>: ''}
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">????????????</div>
                                    <div className="titleBox section2">
                                        <input type="text" placeholder="????????????" onBlur={changeTitle}/>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaContent section1">????????????</div>
                                    <div className="contentBox section2">
                                        <textarea type="text" name="content" id="content" placeholder="???????????? ??????" onBlur={changeContent}/>
                                    </div>
                                </li>
                            </ul>
                        }
                        <div className="submitBtn">
                            <button type="submit" className="btn" onClick={goRegist}> ?????? </button>
                        </div>
                    </div>
                </div>
            </MyPageQnAWrap>
        </>
    );
}
export default MyPageQnA;