import React, { Component } from "react";
import { cancellablePromise } from "../utils/cancellable-promise";
import { delay, noop } from "../utils/utils";

const ClickResolver = WrappedComponent => {
    class ComponentWrapper extends Component {
        componentWillUnmount() {
            // Cancel all pending promises to avoid
            // side effects when the component is unmounted.
            this.clearPendingPromises();
        }

        pendingPromises = [];

        appendPendingPromise = promise =>
            (this.pendingPromises = [...this.pendingPromises, promise]);

        removePendingPromise = promise =>
            (this.pendingPromises = this.pendingPromises.filter(p => p !== promise));

        clearPendingPromises = () => this.pendingPromises.map(p => p.cancel());

        handleClick = (e) => {
            // Create the cancelable promise and add it to
            // the pending promises queue.
            const waitForClick = cancellablePromise(delay(300));
            this.appendPendingPromise(waitForClick);

            return waitForClick.promise
                .then(() => {
                    // if the promise wasn't cancelled, we execute
                    // the callback and remove it from the queue
                    this.removePendingPromise(waitForClick);
                    this.props.onClick(e);
                })
                .catch(errorInfo => {
                    // rethrow the error if the promise wasn't
                    // rejected because of a cancelation
                    this.removePendingPromise(waitForClick);
                    if (!errorInfo.isCanceled) {
                        throw errorInfo.error;
                    }
                });
        };

        handleDoubleClick = (e) => {
            // all (click) pending promises are part of a
            // dblclick event so we cancel them
            this.clearPendingPromises();
            this.props.onDoubleClick(e);
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                />
            );
        }
    }

    ComponentWrapper.displayName = `withClickPrevention(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    ComponentWrapper.defaultProps = {
        onClick: noop,
        onDoubleClick: noop,
    };

    return ComponentWrapper;
};

export default ClickResolver;
