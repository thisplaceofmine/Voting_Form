import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { fetchFormList } from '../../actions';

const FormList = () => {
    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchFormList()) }, []);

    const storeData = useSelector(state => ({
        data: state.manualFormReducer,
        voteOption: state.voteOption
    }));


    const resultCount = () => {
        let option = storeData.voteOption
        let result = Object.values(storeData.data).map((item => item.vote));

        return option.map((value, i) => {
            return result.filter(x => x === value).length;
        })
        ;
    }


    const intiArray = _.fill(Array(resultCount().length), 0)
    const [barCount, setBarCount] = useState(intiArray)

    function barPencentage(id) {
        let totalLength = _.sum(barCount)
        return _.round(barCount[id] / totalLength * 100, 2)
    }

    const handleButtonClick = (name, id) => {
        let tempArray = [...barCount]

        switch (name) {
            case "plus":
                tempArray[id] = tempArray[id] + 1;
                break
            case "minus":
                if (tempArray[id] > 0) { tempArray[id] = tempArray[id] - 1 };
                break
            default:
                return tempArray
        }

        setBarCount(tempArray)
    }

    const RenderBar = () => {
        return barCount.map((value, index) => {
            return (
                <div key={index}>
                    <button
                        className=" ui basic red button icon"
                        name="minus"
                        id={index}
                        onClick={() => { handleButtonClick('minus', index) }}
                    >
                        <i className="minus icon" />
                    </button>
                    <button
                        className=" ui basic green button icon"
                        name="plus"
                        id={index}
                        onClick={() => { handleButtonClick('plus', index) }}
                    >
                        <i className="plus icon" />
                    </button>
                    <div className="ui blue progress" >
                        <div className="bar" style={{ transitionDuration: '600ms', width: `${barPencentage(index)}%` }}>
                            <div className="progress">{barPencentage(index)}({barCount[index]})</div>
                        </div>
                    </div>
                </div>
            );
        });

    }

    const runMe = (e) => {
        console.log(storeData.voteOption)

        setBarCount(resultCount())
    }

    return (
        <div className="ui container">
            <h1 style={{ textAlign: "center" }}>Hello</h1>
            <div>
                <h3 className="ui dividing header">Poll</h3>
                <p>This is the result for the poll for best sign:</p>
                <RenderBar />
            </div>

            <div style={{ textAlign: "right" }}>
                <button
                    onClick={runMe}
                    className="ui primary button"
                >
                    Run ME
                </button>
            </div>
        </div>
    );
}


export default FormList;

