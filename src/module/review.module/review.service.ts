import { HttpException, Injectable } from '@nestjs/common';
import { ReviewEntity } from 'src/db/entities/review.entity';

@Injectable()
export class ReviewService {
  getHello(): string {
    return 'Hello World!';
  }

  async createReview(review) {
    const newReview = new ReviewEntity();
    newReview.rating = review.rating;
    newReview.comment = review.comment;
    newReview.bikeId = review.bikeId;
    newReview.userId = review.userId;

    await newReview.save();
    return newReview.toJSON();
  }

  async getReview(userId): Promise<Array<any>> {
    const review = await ReviewEntity.find({ where: { userId } });
    if (review) return review;
    else {
      throw new HttpException('Not found', 400);
    }
  }

  async getReviewList(bikeId): Promise<Array<any>> {
    const review = await ReviewEntity.find({ where: { bikeId } });
    if (review) return review;
    else {
      throw new HttpException('Not found', 400);
    }
  }
}
