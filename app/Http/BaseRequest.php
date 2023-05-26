<?php


namespace App\Http;

use App\Interfaces\HasDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

abstract class BaseRequest extends FormRequest implements HasDTO
{
    /**
     * @param Validator $validator
     *
     * @throws HttpResponseException
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()->getMessages(),
        ], Response::HTTP_BAD_REQUEST));
    }

    abstract public function dataClass();
}
