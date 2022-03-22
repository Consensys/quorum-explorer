import type { NextApiRequest, NextApiResponse } from 'next'
import { compile } from '../../common/api/contracts'

type Data = {
  abi: any
  bytecode: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req.body)
  let output = compile(req.body.content, req.body.name)
  res.status(200).json(output)
}
