import React from "react"

export const ProfilePage = () => {
  return (
    <div>
      <div>Welcome USER</div>
      <div>Change Name</div>

      <div>Change password</div>
      <div>Change Email</div>

      <div>
        <div>Previous test results:</div>

        <div>
          <span>7 Feb 2018</span>
          <span>2:20</span>
          <button>Delete</button>
        </div>
      </div>

      <div>
        <div>Got another result? Enter its ID below</div>

        <div>INPUT</div>

        <div>
          (if your old result is https://bdsmtest.org/r/29gEr9, then you write
          29gEr9 in the box above)
        </div>

        <button>Start new test</button>
      </div>

      <div>Delete account</div>

      <div>Feedback box</div>
    </div>
  )
}
