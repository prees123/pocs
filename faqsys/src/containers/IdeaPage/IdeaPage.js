import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import * as _ from 'lodash'
import IdeaList from '../../components/Idea/IdeaList'
import IdeaTopBar from '../../components/Idea/IdeaTopBar'
import {IdeaStatusEnum} from '../../components/Idea/IdeaStatus'
import {setFilteredIdeas, getIdeas, getIdeasByTopLevelCategoryName} from '../../actions/Idea/IdeaActions'

class IdeaPage extends React.Component {
  componentDidMount () {
    if (!this.props.topLevelCategoryId) {
      let topLevelCategoryName = _.last(_.split(this.props.location.pathname, '/'))
      this.props.getIdeasByTopLevelCategoryName(topLevelCategoryName)
    } else {
      this.props.getIdeas(this.props.topLevelCategoryId)
    }
  }

  filterIdeas = (searchQuery, statusFilters) => {
    if (_.isEmpty(statusFilters)) {
      statusFilters = _.values(IdeaStatusEnum)
    }
    let filteredIdeas = _.filter(_.filter(this.props.ideas, idea => idea.title.toLowerCase().includes(searchQuery)), idea => statusFilters.indexOf(idea.status) > -1)
    this.props.setFilteredIdeas(filteredIdeas)
  }

  render () {
    return (
      <div>
        <IdeaTopBar onFilter={this.filterIdeas} />
        <IdeaList ideas={this.props.filteredIdeas} />
      </div>
    )
  }
}

const mapDispatchToProps = { setFilteredIdeas, getIdeas, getIdeasByTopLevelCategoryName }

const mapStateToProps = (state) => ({
  ideas: state.ideaReducer.ideas,
  filteredIdeas: state.ideaReducer.filteredIdeas,
  userInfo: state.user,
  topLevelCategoryId: state.category.topLevelCategoryId,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IdeaPage))
