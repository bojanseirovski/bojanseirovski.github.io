import React, {useEffect, useState} from "react";

const Account = () => {

    return (
        <div className="coloringWrapper login mt-4 pl-3 pr-3">
            <div className="row">
                <div className="col-12">
                    Account
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        Email: 
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        Password
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    );
}

export default Account;