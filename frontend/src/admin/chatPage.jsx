import React, { useEffect, useState } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../src/app.css';
import axios from "axios";

const ChatForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    ul { list-style:none; display: flex; }
    ul li { padding: 0.6rem; font-size: 1.8rem; background-color: none; color: #888; cursor: pointer; font-weight: bold; }
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .chatListBox { background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .chatSearchBox { display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .chatSearchBox p { margin: 0 1rem; display: flex; align-items: center; }
    .btn { padding: 0.4rem 1.2rem }
    .searchBtn { background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn { background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    select { width:12rem; margin-right:1rem; border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); padding: 0 1rem; }
    select:focus, .chatDate:focus { outline:none; }
    .chatDate { border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); padding: 0 1rem; }
    .chatRoomName a { text-decoration: none; color: #555; font-weight: bolder;  }
    .chatRoomName a:hover { color: #14c1c7; font-size: 1.45rem; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .search-text { font-weight: bold; font-size: 1.4rem; }
    .nonData { height: 10rem; color: #999; font-size: 1.4rem; }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;
const ChatPage = () => {

    const [listAxios, setAxios] = useState(0); // useEffect axios??? ??? ?????? ?????? ??????
    let [chat, setChat] = useState([]);
    let [pageNum, setPageNum] = useState(1);
    let [change, setChange] = useState(1); // useEffect ???????????? ?????? change?????? ??????
    let [search, setSearch] = useState('');
    let [dateStart, setDateStart] = useState('');
    let [dateEnd, setDateEnd] = useState('')

    let pages = [];

    const Pagination = (page) =>{ 
        setPageNum(page)
        if(change==1){setChange(0)}else{setChange(1)} // useEffect ???????????? ?????? change?????? ??????
    } 

    const PaginationNum = (e) =>{
        let pageNum = e.target.id
        Pagination(pageNum)
    }

    const PaginationArr = (e) =>{
        let pageArr = e.target.value
        Pagination(pageArr)
    }

    const Start = (e)=>{
        e.preventDefault()
        const dateStart = e.target.value;
        setDateStart(dateStart)
    }

    const End = (e)=>{
        e.preventDefault()
        const dateEnd = e.target.value;
        setDateEnd(dateEnd)
    }

    const searchSelect = (e)=>{
        e.preventDefault()
        const searchSelect = e.target.value;
        setSearch(searchSelect)
    }
    
    const Search = () =>{
        setPageNum(1)
        if(change==1){setChange(0)}else{setChange(1)} // useEffect ???????????? ?????? change?????? ??????
    }

    const Reset = () =>{
        setSearch('')
        setDateStart('')
        setDateEnd('')
        let e1 = document.getElementById('startDate');
        let e2 = document.getElementById('endDate');
        let e3 = document.getElementById('report');
        e1.value = '';
        e2.value = '';
        e3.value = '';
        Search()
    }

    useEffect(async () => {
        const chat = await axios.get("http://localhost:3001/admin/chat?page=" + pageNum + "&report=" + search + "&date1=" + dateStart + "&date2=" + dateEnd)
        setChat(chat.data)
        let paginationClass = document.querySelectorAll('.paginationClass');
        if(chat.data.totalPage!==0){
            for(let i=0; i<paginationClass.length; i++){
                paginationClass[i].style.color = "#888";
            }
            let current = document.getElementById(pageNum);
                current.style.color = "#14c1c7";
        }
        if(chat.data.result.length !== 0){ setAxios(1) } // axios??? ??? ?????? ?????? ??????
    }, [change]);

    for(let i = chat.startPage; i <= chat.endPage; i++) { pages[i] = i }

    return (
        <Form>
            <Header/>
            <SideBar/>
            <ChatForm>
                <div className="chatListBox">
                <p className="title">????????????</p>
                    <div className="chatSearchBox">
                        <p className="search-text">??????</p>
                        <select id="report" onChange={searchSelect}>
                            <option value="">??????</option>
                            <option value="Y">???????????? : Y</option>
                            <option value="N">???????????? : N</option>
                        </select>
                        <p className="search-text">??????</p>
                        <input type="date" className="chatDate" id="startDate" onChange={Start}/>
                        <p>~</p>
                        <input type="date" className="chatDate" id="endDate" onChange={End}/>
                        <input type="button" className="searchBtn btn" value="??????" onClick={Search}/>
                        <input type="button" className="resetBtn btn" value="?????????" onClick={Reset}/>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th width="10%" className="Number">??????</th>
                                <th width="10%" className="chatNumber">?????????</th>
                                <th width="27%" className="chatRoomName">????????????</th>
                                <th width="20%" className="chatDateText">?????? ????????????</th>
                                <th width="18%" className="chatType">????????? ??????</th>
                                <th width="15%" className="chatDec">????????? ????????????</th>
                            </tr>
                            { listAxios !== 0 ?
                                chat.result.length !== 0 ?
                                    chat.result.map(rowData => (
                                        <tr>
                                            <td className="Number">{rowData.idx}</td>
                                            <td className="chatNumber">{rowData.cnt}</td>
                                            <td className="chatRoomName"><Link to={"/admin/chat/detail/"+rowData.idx} className="link">{rowData.title}</Link></td>
                                            <td className="chatDateText">{rowData.createdAt}</td>
                                            <td className="chatType">{rowData.type}</td>
                                            <td className="chatDec">{rowData.report}</td>
                                        </tr>
                                    )) : // rowData ??? ????????? ?????????
                                    <tr className="nonData"><td colSpan="6">??????????????? ???????????? ????????????</td></tr>
                                : // chat??? ???????????? ????????? ?????????
                                <tr className="nonData"><td colSpan="6">????????? ???????????? ????????????</td></tr>
                            }
                        </table>
                    </div>
                    <div className="pagination">
                        <ul>
                        { chat.startPage !== 1 ?
                            <>
                            <li onClick={PaginationArr} value="1">???</li>
                            <li onClick={PaginationArr} value={chat.startPage-1}>???</li>
                            </>
                            : <></> // startPage??? 1?????? ?????????
                        }
                        { chat.totalPage !== 0 ?
                            pages.map(rowData => (
                                chat.startPage+5 > rowData ?
                                <li onClick={PaginationNum} class="paginationClass" id={rowData}>{rowData}</li>
                                : <></>
                            )) : <></> // pages??? ????????? ?????????
                        }
                        { chat.endPage !== chat.totalPage && chat.endPage < chat.totalPage ?
                            <>
                            <li onClick={PaginationArr} value={chat.endPage+1}>???</li>
                            <li onClick={PaginationArr} value={chat.totalPage}>???</li>
                            </> : <></>
                        }
                        </ul>
                    </div>
                </div>
            </ChatForm>
        </Form>
    );
}

export default ChatPage;