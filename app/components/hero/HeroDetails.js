import React , {Component} from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import Title from '../shared/Title';
import Panel from '../shared/Panel';
import DetailsList from "../shared/DetailsList";
const credentials = require('../shared/credentials');
class HeroDetails extends Component{
  constructor(props) {
   super(props);
   this.state = {hero: [] , isLoading: true};
 }
    componentWillMount() {
        this.getHero();
    }

    getHero() {
        const that = this;
        $.getJSON(credentials.url + "/" + this.props.params.id, {
            ts: credentials.ts,
            apikey: credentials.PUBLIC_KEY,
            hash: credentials.hash,
        })
            .done(function(response) {
                that.setState({hero : response.data.results[0],isLoading: false});
            })
            .fail(function(err){
                // error logs
                console.log(err);
            });
    }
    render() {
    return(<div className="container">
      <Link to="/"><h3>Retour</h3></Link>
      <Title color={"#ec008c"} content={"Fiche identité :"} />
      {!this.state.isLoading &&
      <div className="row">
        <div className="col-lg-2">
          <img
            className="card-img-top" ref={img => this.img = img} src={this.state.hero.thumbnail.path + "/portrait_xlarge.jpg"} alt="Hero Card image"
            onError={() => this.img.src = '../../../assets/img/not-found.png'}style={{width: '150px'}} onClick={this.handleOnClick}
          />
        </div>
        <div className="col-lg-10">
          <Panel title={this.state.hero.name} description={this.state.hero.description} />
          <DetailsList title={"Comics"} details={this.state.hero.comics} />
          <DetailsList title={"Series"} details={this.state.hero.series} />
        </div>
      </div>
            }
    </div>
    );
  }
}
HeroDetails.propTypes = {
    id: PropTypes.number,
    imageSrc: PropTypes.string
};
export default HeroDetails;
