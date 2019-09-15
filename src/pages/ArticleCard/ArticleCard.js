/**
 * @desc [每一个文章card]
 */
import React from 'react';
import { Skeleton, Card } from 'antd';
import './ArticleCard.less';
import service from '../../service/index';


const { Meta } = Card;

class ArticleCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      issueList: [],
    };
  }


  componentDidMount() {
    this.setState({
      issueList: service.getIssueList(),
    })
  }

  render(){
    const { issueList } = this.state;
        return (
             <Card className="article-card-root">
               <Skeleton loading={!issueList.length} avatar active>
                  {
                      issueList.map(function(issue){
                          return (
                            <Meta
                              className="unloaded"
                              key={issue.title}
                              description={
                                <div className="article-card">
                                  <span className="article-title">{issue.title}</span>
                                  <div className="article-info">
                                    <span className="article-author">{issue.author || '暂无作者信息'}</span>
                                    <span className="article-date">{issue.created_at}</span>
                                  </div>
                                  <p className="article-outline"> {issue.outline || '暂无文章缩略信息'} </p>
                                  <div className="article-detail">
                                    <a className="article-detail" href={`/#/details/${issue.id}`}>继续阅读</a>
                                    <i className="fa fa-angle-double-right fa-lg"></i>
                                  </div>
                                </div>
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


export default ArticleCard;
