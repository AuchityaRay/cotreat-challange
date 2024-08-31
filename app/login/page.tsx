import React from 'react'

type Props = {}

const Login = (props: Props) => {
  return (
      <>
     <div className="flex flex-col items-center justify-center  overflow-hidden h-screen ">
      <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center shadow-lg 
      w-[980px] h-[700px]">
        <h1 className="text-3xl font-bold text-center mb-4 font-robotoSerif">PicShare</h1>
        <p className="text-center text-gray-500   mb-8">Login to start sharing</p>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg  
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-daybreak-blue text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
      </>
  )
}

export default Login