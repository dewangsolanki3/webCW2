import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ProfileGithub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 5,
      clientSecret: '15a7b19e155149065817be28fb6fec95e5517f4d',
      clientId: '33c997749ef050865a06',
      sort: 'created: asc',
      repos: []
    }
  }

  componentDidMount() {
    let { sort, count, clientId, clientSecret } = this.state
    let { username } = this.props

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then( (response) => response.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data })
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    let { repos } = this.state

    let repoItems = repos.map(repository => (
      <div key={repository.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repository.html_url} className="text-info" target="_blank">
                {repository.name}
              </Link>
            </h4>
            <p>{repository.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repository.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repository.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repository.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr /> <br />
        <h4 className="mb-4">Top Github Repositories by - {this.props.username}</h4>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub
