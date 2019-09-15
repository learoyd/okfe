/**
 * @desc [归档页面]
 */
import React from 'react';
import { Skeleton, Card } from 'antd';
import './Archive.less';
import service from '../../service/index';

const { Meta } = Card;

class Archive extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ArticleList:[]
        }
    }
    componentWillMount() {
        const result = service.getIssueList();
        this.setState({
            ArticleList:result,
        });
    }

    render(){
        const { ArticleList } = this.state;
        let lastBelong = '';
        return (
            <Card className="archive">
              <div className="classify-title">
                归档
              </div>
              <Skeleton loading={!ArticleList.length} avatar active>
               {
                   ArticleList.map((res,key)=>{
                       return(
                         <Meta
                           key={res.title}
                           description={
                             <section>
                               {
                                 res.belong !== lastBelong ? <div className='issue-classify'>{res.time}</div> : ''
                               }
                               <div style={{display:'none'}}>
                                 {
                                   lastBelong !== res.belong ? lastBelong = res.belong : ''
                                 }
                               </div>
                               <div className="issue-items">
                                 <a className="issue-title" href={`/#/details/${res.id}`}>·&nbsp; {res.title}</a>
                                 <div className="issue-time">{res.updated_at}</div>
                               </div>
                             </section>
                           }
                           >
                         </Meta>
                        )
                    })
                }
              </Skeleton>
            </Card>
        )
    }
}

export default Archive;

