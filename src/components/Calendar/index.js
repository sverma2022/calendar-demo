import React, { useState } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import map from "lodash/map";
import find from "lodash/find";
import { getTimeSlots } from "../../helpers";

const CalendarView = ({ facilities, Events }) => {
  const [resourceSize] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
  ]);

  const renderCells = (numberOfCells) => {
    let tempArray = [];
    for (let i = 0; i < numberOfCells; i++) {
      tempArray.push(i);
    }

    return tempArray;
  };

  const getSlot = (time, resourceID) => {
    const event = find(Events, { resource_id: resourceID });
    if (event) {
      const eventStartTime = event.start_time.split(":")[0];
      if (time.startTime.split(":")[0] === eventStartTime) {
        return (
          <Draggable>
            <div className="calendar_event">
              <div>Name: {event.resource_name}</div>
              <div>Start: {event.start_time}</div>
            </div>
          </Draggable>
        );
      }
    }
  };

  console.log("============= Events ===========", Events);
  console.log("============= facilities ===========", facilities);
  return (
    <>
      {map(facilities, (facility) => {
        return (
          <>
            <Row>
              <Col>
                <div className="calender_heading">{facility.facility_name}</div>
              </Col>
            </Row>
            <Row>
              {map(facility.resource_names, (resourceName) => {
                return (
                  <Col className="border">
                    <div className="fw-bold text-center">
                      {resourceName.name}
                    </div>
                    <Row>
                      {map(
                        resourceSize.slice(0, resourceName.resource_size_count),
                        (res) => {
                          return (
                            <Col className="border-top">
                              <div className="fw-bold text-center">{res}</div>
                            </Col>
                          );
                        }
                      )}
                    </Row>
                  </Col>
                );
              })}
            </Row>

            {getTimeSlots(facility.facility_name)?.map((timeSlot) => {
              return (
                <Row className="time_slot">
                  <span className="time_slot_name">{timeSlot.short}</span>
                  {map(facility.resource_names, (resourceName) => {
                    return (
                      <Col className="border">
                        {getSlot(timeSlot, resourceName.id)}
                        <Row>
                          {map(
                            resourceSize.slice(
                              0,
                              resourceName.resource_size_count
                            ),
                            (time) => {
                              return <Col className="inner_cell"></Col>;
                            }
                          )}
                        </Row>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </>
        );
      })}
    </>
  );
};

CalendarView.propTypes = {};
export default CalendarView;
